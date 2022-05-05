module.exports = {
  name: "twitter",
  description: "Links you my Twitter profile.",
  message: "Follow me on Twitter! https://twitter.com/ljtechdotca",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
