const { StaticAuthProvider } = require("@twurple/auth");
const { ChatClient } = require("@twurple/chat");
const { INIT_COMMANDS } = require("./constants");
const { randomEmote } = require("./helpers");
require("dotenv").config();

// environment variables
// const SECRET = process.env.LJTECHBOTCA_SECRET;
const CLIENT_ID = process.env.LJTECHBOTCA_ID;
const ACCESS_TOKEN = process.env.LJTECHBOTCA_ACCESS_TOKEN;

let today = "Nothing is happening today!";

async function main() {
  const auth = new StaticAuthProvider(CLIENT_ID, ACCESS_TOKEN);

  // initialize chat client
  const client = new ChatClient({
    authProvider: auth,
    channels: ["ljtechdotca"],
  });
  await client.connect();

  client.onMessage((channel, user, message) => {
    const words = message.split(" ");
    const command = message[0] === "!" ? words[0] : false;
    if (command) {
      const args = words.slice(1, words.length);
      switch (command) {
        case "!commands":
          client.say(channel, INIT_COMMANDS.join(", "));
          break;
        case "!dice":
          client.say(
            channel,
            `@${user} rolled a ${Math.floor(Math.random() * 6) + 1}`
          );
          break;
        case "!discord":
          client.say(
            channel,
            "Join the Discord channel! https://discord.com/invite/F6nDGk5HKU"
          );
          break;
        case "!drop":
          if (user === "ljtechdotca") {
            client.say(channel, `!drop ${randomEmote()} parachute`);
          }
          break;
        case "!figma":
          client.say(
            channel,
            "View my public Figma projects https://www.figma.com/@ljtech"
          );
          break;
        case "!github":
          client.say(
            channel,
            "View my projects on GitHub https://github.com/ljtechdotca"
          );
          break;
        case "!linkedin":
          client.say(
            channel,
            "Link up on LinkedIn https://www.linkedin.com/in/ljtechdotca/"
          );
          break;
        case "!linkport":
          client.say(
            channel,
            "Check out my LinkPort! https://linkport.dev/ljtech"
          );
          break;
        case "!ljtech":
          client.say(channel, "Visit my website! https://ljtech.ca");
          break;
        case "!today":
          if (user === "ljtechdotca" && args[0] === "set") {
            today = args.slice(1, args.length).join(" ");
          } else {
            client.say(channel, today);
          }
          break;
        case "!twitter":
          client.say(
            channel,
            "Follow me on Twitter! https://twitter.com/ljtechdotca"
          );
          break;
        case "!unicorn":
          client.say(
            channel,
            "Join the UU Discord! https://discord.com/invite/FMcvc6T"
          );
          break;
        // all socials
        case "!socials":
          if (user === "ljtechdotca") {
            client.say(channel, "Visit my website! https://ljtech.ca");
            client.say(
              channel,
              "Join the Discord channel! https://discord.com/invite/F6nDGk5HKU"
            );
            client.say(
              channel,
              "View my projects on GitHub https://github.com/ljtechdotca"
            );
            client.say(
              channel,
              "Follow me on Twitter! https://twitter.com/ljtechdotca"
            );
            client.say(
              channel,
              "View my public Figma projects https://www.figma.com/@ljtech"
            );
            client.say(
              channel,
              "Link up on LinkedIn https://www.linkedin.com/in/ljtechdotca/"
            );
          }
          break;
        default:
          console.log("\x1b[31m%s\x1b[0m", "ERROR:");
          console.log(
            "\x1b[33m%s\x1b[0m",
            "Bad Command Name:",
            command,
            ...args
          );
          break;
      }
    }
  });
}

main();
