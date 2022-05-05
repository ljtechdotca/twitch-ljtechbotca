const isNumber = (string, defaultTo) => {
  const isUndefined = Number.isNaN(parseInt(string));
  let number = defaultTo;
  if (!isUndefined) {
    number = Math.abs(parseInt(string));
  }
  return number;
};

const format = {
  isNumber,
};

module.exports = {
  description: "Lists all the vscode extensions ljtechdotca uses.",
  name: "dice",
  message: "Rolls a number between a <RANGE>",
  execute: function (client, user, args) {
    const number = format.isNumber(args[0], 6);
    client.say(
      "ljtechdotca",
      `@${user} rolled a ${number}-sided 🎲 and got ${
        ~~(Math.random() * number) + 1
      }`
    );
  },
};
