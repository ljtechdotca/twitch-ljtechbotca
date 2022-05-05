module.exports = {
  description: "Lists all the vscode extensions ljtechdotca uses.",
  name: "extensions",
  message:
    "Check out my extensions: https://gist.github.com/ljtechdotca/b2c38e16dbef82f51c7282eef18d0b91",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
