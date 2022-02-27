module.exports = {
  name: "linkedin",
  message: "Link up on LinkedIn https://www.linkedin.com/in/ljtechdotca/",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};
