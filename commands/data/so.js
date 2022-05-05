module.exports = {
  name: "so",
  description: "Shout out a Twitch channel.",
  message: function (channel) {
    `Go check out and follow ${channel} @ https://www.twitch.tv/${channel}!`;
  },
  execute: function (client, user, args) {
    if (user === "ljtechdotca") {
      client.say("ljtechdotca", this.message(args[0]));
    }
  },
};
