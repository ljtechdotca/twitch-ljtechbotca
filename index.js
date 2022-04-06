const { RefreshingAuthProvider } = require("@twurple/auth");
const { ChatClient } = require("@twurple/chat");
const { INIT_COMMANDS } = require("./commands/index.js");
const fs = require("fs");
require("dotenv").config();

async function main() {
  try {
    // reading access and refresh tokens from tokens.json
    const tokenFile = fs.readFileSync("./tokens.json", "UTF-8");
    const tokenData = JSON.parse(tokenFile);

    // auto refreshing tokens data through client id and secret
    const auth = new RefreshingAuthProvider(
      {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        onRefresh: (
          newTokenData // rewriting tokens.json on refresh
        ) =>
          fs.writeFileSync(
            "./tokens.json",
            JSON.stringify(newTokenData, null, 4),
            "UTF-8"
          ),
      },
      tokenData
    );

    // creating a new twurple chat client instance
    const client = new ChatClient({
      authProvider: auth,
      channels: ["ljtechdotca"],
    });
    await client.connect();

    // capture commands from incoming chat message
    client.onMessage((channel, user, message) => {
      const isCommand = message.startsWith("!");
      if (isCommand) {
        const words = message.split(" ");
        let command = words[0].slice(1);
        const args = words.slice(1);
        console.log({ command, args: args.join(" ") });
        if (INIT_COMMANDS[command]) {
          INIT_COMMANDS[command].execute(client, user, args);
        } else {
          console.log(`Invalid Command : ${command}`);
        }
      }
    });

    // interval commands the bot will say in chat
    let count = 0;
    client.onRegister((event) => {
      client.say("ljtechdotca", "ljtechDerp ljtechbotca has arrived!");
      setInterval(() => {
        switch (count % 3) {
          case 0:
            client.say("ljtechdotca", "!drop ljtechDerp");
            count++;
            break;

          case 1:
            INIT_COMMANDS.discord.execute(client);
            count++;
            break;

          case 2:
            INIT_COMMANDS.today.execute(client);
            count++;
            break;
        }
      }, 1000 * 60 * 30);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
