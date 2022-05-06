const { RefreshingAuthProvider } = require("@twurple/auth");
const { ChatClient } = require("@twurple/chat");
const { INIT_COMMANDS } = require("./commands/index.js");
const { hexToRGB } = require("./helpers/format");
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
    client.onMessage((channel, user, message, msg) => {
      const isCommand = message.startsWith("!");
      if (isCommand) {
        const words = message.split(" ");
        let command = words[0].slice(1);
        const args = words.slice(1);
        if (INIT_COMMANDS[command]) {
          INIT_COMMANDS[command].execute(client, user, args);
          if (command === "discord" && count == 1) {
            count++;
          }
          if (command === "today" && count == 2) {
            count++;
          }
        }
      } else {
        INIT_COMMANDS.unlurk.execute(client, user);
        let color = [255, 0, 0];
        if (msg.userInfo.color) {
          color = hexToRGB(msg.userInfo.color);
        }
        console.log(
          `\x1b[38;2;${color[0]};${color[1]};${color[2]}m${user}\x1b[0m: ${message}`
        );
      }
    });

    // interval commands the bot will say in chat
    let count = 0;
    client.onRegister((event) => {
      client.say("ljtechdotca", "ljtechDerp ljtechbotca has arrived!");
      setInterval(() => {
        switch (count % 3) {
          case 0:
            client.say("ljtechdotca", "!drop catJAM");
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
