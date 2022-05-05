module.exports = {
  name: "extensions",
  description:
    "Links you to a GitHub gist of my Visual Studio Code extensions.",
  message:
    "Check out my extensions: https://gist.github.com/ljtechdotca/b2c38e16dbef82f51c7282eef18d0b91",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
