module.exports = {
  name: "so",
  description: "Shout out a Twitch channel.",
  message: function (channel) {
    return `Go check out and follow ${channel} @ https://www.twitch.tv/${channel}!`;
  },
  execute: function (client, { args, user }) {
    console.log({ args });
    if (user === "ljtechdotca" && args.length) {
      client.say("ljtechdotca", this.message(args[0]));
    }
  },
};
