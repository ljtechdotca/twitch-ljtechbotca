module.exports = {
  name: "twitter",
  message: "Follow me on Twitter! https://twitter.com/ljtechdotca",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
