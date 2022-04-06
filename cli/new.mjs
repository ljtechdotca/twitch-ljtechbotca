import fs from "fs";
import path from "path";

// parse command name from terminal command line
const command = process.argv[2];

// write a new command file under the /commands/data directory
const dataPath = path.resolve(".", "commands", "data", `${command}.js`);
const template = `module.exports = {
  name: "${command}",
  message: "This is a new command.",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};`;
fs.writeFileSync(dataPath, template);
