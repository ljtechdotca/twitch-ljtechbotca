module.exports = {
  name: "figma",
  message: "View my public Figma projects https://www.figma.com/@ljtech",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
