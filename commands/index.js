const fs = require("fs");

const path = require("path");

class Command {
  name = "";
  message = "";
  execute = () => {};

  constructor(init) {
    Object.assign(this, init);
  }
}

const dataPath = path.resolve(".", "commands", "data");

const commandNames = fs.readdirSync(dataPath);

let commands = {};

commandNames.forEach((command) => {
  const key = command.slice(0, command.length - 3);

  commands = { ...commands, [key]: require(`./data/${command}`) };
});

module.exports = {
  INIT_COMMANDS: {
    ...commands,
    commands: new Command({
      name: "commands",
      message: "Shows a list of all available commands",
      execute: function (client, user, args) {
        client.say(
          "ljtechdotca",
          `${Object.values(commands)
            .map((command) => `!${command.name}`)
            .join(", ")}`
        );
      },
    }),
  },
};
