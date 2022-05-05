module.exports = {
  name: "lorem",
  description: "Generates dummy text.",
  message:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident distinctio non magnam iusto deserunt deleniti odio cupiditate! Reiciendis, possimus in.",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
