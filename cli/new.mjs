import fs from "fs";
import path from "path";

let command = process.argv[2];
const dataPath = path.resolve(".", "commands", "data", `${command}.js`);

console.log(dataPath);

const template = `module.exports = {
  name: "${command}",
  message: "This is a new command.",
  execute: function (client, user, args) {
    client.say("ljtechdotca", this.message);
  },
};`;

fs.writeFileSync(dataPath, template);
