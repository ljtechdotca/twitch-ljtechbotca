module.exports = {
  description: "Lists all the vscode extensions ljtechdotca uses.",
  name: "discord",
  message: "Join the Discord channel! https://discord.com/invite/F6nDGk5HKU",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
