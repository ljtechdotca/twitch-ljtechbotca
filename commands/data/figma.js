module.exports = {
  name: "figma",
  description: "Links you my Figma community profile.",
  message: "View my public Figma projects https://www.figma.com/@ljtech",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
