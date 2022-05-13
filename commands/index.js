const { readdirSync } = require("fs");
const { resolve } = require("path");
const { Command } = require("../helpers/command");

const help = new Command({
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
  execute: function (client, { args, user }) {
    client.say("ljtechdotca", this.message(args));
  },
});

// docs : read single file commands from /commands/data and export as commands
const commandNames = readdirSync(resolve(".", "commands", "data"));
let commands = {};
commandNames.forEach((commandName) => {
  const key = commandName.split(".")[0];
  commands = { ...commands, [key]: require(`./data/${commandName}`) };
});

module.exports = {
  commands: {
    ...commands,
    help,
    commands: new Command({
      name: "commands",
      description: "Shows a list of all available commands.",
      message: Object.values({ ...commands, help })
        .map((command) => `!${command.name}`)
        .join(", "),
      execute: function (client, { args, user }) {
        client.say("ljtechdotca", this.message);
      },
    }),
  },
};
