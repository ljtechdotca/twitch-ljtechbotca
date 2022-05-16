const { ChatClient } = require("@twurple/chat");
const { PubSubClient } = require("@twurple/pubsub");
const { commands } = require("./commands/index.js");
const { config } = require("dotenv");
const { StaticAuthProvider } = require("@twurple/auth");
const { tokens } = require("./helpers/tokens");
const {
  redemptionListener,
  followingListener,
  hostedListener,
  messageListener,
  raidListener,
  resubListener,
} = require("./helpers/events");

config();

// todo : refactor and abstract some things?

// note : interval options
let pointer = 0;
let intervalCmds = ["today", "discord", "twitter", "github", "drop"];
let currCmd = () => intervalCmds[pointer % intervalCmds.length];
const mins = 20;

async function main() {
  try {
    // docs : init auth providers for the chat bot and streamer
    const botAuth = tokens(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "bot-tokens.json"
    );
    const streamerAuth = new StaticAuthProvider(
      process.env.STREAMER_CLIENT_ID,
      process.env.STREAMER_TOKEN,
      [
        "chat:read",
        "chat:edit",
        "channel:moderate",
        "channel:read:redemptions",
        "user:read:follows",
      ]
    );

    // docs : init clients for chat and pubsub
    const chatClient = new ChatClient({
      authProvider: botAuth,
      channels: ["ljtechdotca"],
    });
    await chatClient.connect();
    const pubSubClient = new PubSubClient();
    const userId = await pubSubClient.registerUserListener(streamerAuth);

    hostedListener(chatClient);
    messageListener(commands, chatClient);
    raidListener(chatClient);
    resubListener(chatClient);
    await redemptionListener(userId, pubSubClient);
    await followingListener(userId, pubSubClient);

    // note : an interval is set onRegister to go through a list of predefined commands
    chatClient.onRegister((_event) => {
      chatClient.say("ljtechdotca", "ljtechDerp ljtechbotca has arrived!");
      setInterval(() => {
        if (currCmd() === "drop") {
          chatClient.say("ljtechdotca", "!drop catJAM parachute");
        } else {
          commands[currCmd()].execute(chatClient, {
            user: "ljtechbotca",
          });
        }
        pointer++;
      }, 1000 * 60 * mins);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
