const { ChatClient } = require("@twurple/chat");
const { commands } = require("./commands/index.js");
const { config } = require("dotenv");
const { hexToRGB } = require("./helpers/format");
const { RefreshingAuthProvider } = require("@twurple/auth");
const fs = require("fs");

config();

// note : interval options
let pointer = 0;
let intervalCommands = ["today", "discord", "twitter", "github", "drop"];
let currentCommand = () => intervalCommands[pointer % intervalCommands.length];
const mins = 20;

async function main() {
  try {
    // docs : init auth tokens
    const tokenFile = fs.readFileSync("./tokens.json", "utf-8");
    const tokenData = JSON.parse(tokenFile);
    const auth = new RefreshingAuthProvider(
      {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        onRefresh: (newTokenData) =>
          fs.writeFileSync(
            "./tokens.json",
            JSON.stringify(newTokenData, null, 4),
            "utf-8"
          ),
      },
      tokenData
    );

    // docs : init twurple client
    const client = new ChatClient({
      authProvider: auth,
      channels: ["ljtechdotca"],
    });
    await client.connect();

    // docs : message event handler
    client.onMessage((_channel, user, message, msg) => {
      // note : terminal chat box
      let color = [255, 0, 0];
      if (msg.userInfo.color) {
        color = hexToRGB(msg.userInfo.color);
      }
      console.log(
        `[${new Date().toLocaleTimeString()}]\x1b[38;2;${color[0]};${
          color[1]
        };${color[2]}m[${user}]\x1b[0m: ${message}`
      );
      // note : twitch bot commands
      const words = message.split(" ");
      const commandName = words[0].slice(1);
      const isCommand = message.startsWith("!");
      let details = { user };
      if (isCommand) {
        const command = commands[commandName];
        if (command) {
          if (command === currentCommand()) {
            pointer++;
          }
          const args = words.slice(1);
          details.args = args;
          command.execute(client, details);
        }
      } else {
        commands.unlurk.execute(client, details);
      }
    });

    client.onRegister((_event) => {
      // note : init welcome message
      client.say("ljtechdotca", "ljtechDerp ljtechbotca has arrived!");

      // note : interval commands and messages
      const details = {
        user: "ljtechbotca",
      };
      setInterval(() => {
        if (currentCommand() === "drop") {
          client.say("ljtechdotca", "!drop catJAM parachute");
        } else {
          commands[currentCommand()].execute(client, details);
        }
        pointer++;
      }, 1000 * 60 * mins);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
