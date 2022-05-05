module.exports = {
  name: "discord",
  description: "Links you my Discord server.",
  message: "Join the Discord server! https://discord.com/invite/F6nDGk5HKU",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
