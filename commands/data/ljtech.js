module.exports = {
  name: "ljtech",
  description: "Links you my personal website.",
  message: "Visit my website! https://ljtech.ca",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
