import fs from "fs";
import path from "path";

// use this cli with the following:
// $yarn new-cmd <COMMAND_NAME>

const command = process.argv[2];
const dataPath = path.resolve(".", "commands", "data", `${command}.js`);
const template = `module.exports = {
  name: "${command}",
  description: "This is the help message.",
  message: "This is the default message.",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};`;
fs.writeFileSync(dataPath, template);
