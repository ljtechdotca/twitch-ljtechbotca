module.exports = {
  name: "github",
  description: "Links you my GitHub profile.",
  message: "View my projects on GitHub https://github.com/ljtechdotca",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
