const fs = require("fs");
const path = require("path");

// class used to create commands manually
class Command {
  name = "";
  description = "";
  message = "";
  execute = () => {};
  constructor(init) {
    Object.assign(this, init);
  }
}

// read from /commands/data and create an object of commands
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
      description: "Shows a list of all available commands.",
      message: Object.values(commands)
        .map((command) => `!${command.name}`)
        .join(", "),
      execute: function (client, user, args) {
        client.say("ljtechdotca", this.message);
      },
    }),
    help: new Command({
      name: "help",
      description: "Gives detailed information of a command.",
      message: function (args) {
        const command = commands[args[0]];
        if (command !== undefined) {
          return commands[args[0]].description;
        } else {
          return `${args[0]} is not a valid command name, try !commands`;
        }
      },
      execute: function (client, user, args) {
        client.say("ljtechdotca", this.message(args));
      },
    }),
  },
};
