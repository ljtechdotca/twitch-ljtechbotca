const { StaticAuthProvider } = require("@twurple/auth");
const { ChatClient } = require("@twurple/chat");
const { INIT_COMMANDS } = require("./commands/index.js");

require("dotenv").config();

let today = "✨ Nothing is happening today!";

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

    // client.onRegister((event) => {
    //   client.say(
    //     "ljtechdotca",
    //     "_.-={ MrDestructoid ljtechbotca has arrived! }=-._"
    //   );
    //   setInterval(() => {
    //     client.say("ljtechdotca", "!drop ljtechHype");
    //   }, 900000);
    //   setInterval(() => {
    //     client.say("ljtechdotca", INIT_COMMANDS.discord);
    //   }, 1800000);
    // });
  } catch (error) {
    console.error(error);
  }
}

main();
