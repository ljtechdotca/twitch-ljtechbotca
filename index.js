const { StaticAuthProvider } = require("@twurple/auth");
const { ChatClient } = require("@twurple/chat");
const { INIT_COMMANDS } = require("./commands/index.js");

require("dotenv").config();

async function main() {
  try {
    const auth = new StaticAuthProvider(
      process.env.LJTECHBOTCA_ID,
      process.env.LJTECHBOTCA_ACCESS_TOKEN
    );

    const client = new ChatClient({
      authProvider: auth,
      channels: ["ljtechdotca"],
    });

    await client.connect();

    client.onMessage((channel, user, message) => {
      const isCommand = message.startsWith("!");
      if (isCommand) {
        const words = message.split(" "); // the message split as an array of strings
        let key = words[0].slice(1, words[0].length); // the !commandName
        const args = words.slice(1, words.length); // everything that comes after the !commandName
        console.log({ words, key, args });
        if (INIT_COMMANDS[key]) {
          console.log(INIT_COMMANDS[key]);
          INIT_COMMANDS[key].execute(client, user, args);
        } else {
          console.log(`Bad command : ${key}`);
        }
      }
    });

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
