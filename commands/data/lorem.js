module.exports = {
  name: "lorem",
  message:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident distinctio non magnam iusto deserunt deleniti odio cupiditate! Reiciendis, possimus in.",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
