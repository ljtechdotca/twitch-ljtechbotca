module.exports = {
  description: "Lists all the vscode extensions ljtechdotca uses.",
  name: "figma",
  message: "View my public Figma projects https://www.figma.com/@ljtech",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
