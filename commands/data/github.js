module.exports = {
  name: "github",
  message: "View my projects on GitHub https://github.com/ljtechdotca",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
