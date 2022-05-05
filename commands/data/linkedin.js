module.exports = {
  name: "linkedin",
  description: "Links you my LinkedIn profile.",
  message: "Link up on LinkedIn https://www.linkedin.com/in/ljtechdotca/",
  execute: function (client) {
    client.say("ljtechdotca", this.message);
  },
};
