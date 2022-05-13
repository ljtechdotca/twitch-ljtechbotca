const { isNumber } = require("../../helpers/format");

module.exports = {
  name: "dice",
  description: "Rolls a number between a given range. ex: !dice 10",
  message: function (user, sides, value) {
    return `@${user} has rolled a ${sides}-sided die and got ${value}!`;
  },
  execute: function (client, { args, user }) {
    const sides = isNumber(args[0], 6);
    const value = Math.floor(Math.random() * sides) + 1;
    client.say("ljtechdotca", this.message(user, sides, value));
  },
};
