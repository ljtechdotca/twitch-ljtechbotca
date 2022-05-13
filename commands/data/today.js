const path = require("path");
const fs = require("fs");

module.exports = {
  name: "today",
  description: "Shout out a Twitch channel.",
  message: fs.readFileSync(path.resolve(".", "data", "today.txt")),
  execute: function (client, { args, user }) {
    if (user === "ljtechdotca" && args[0] === "set") {
      const today = args.slice(1, args.length).join(" ");
      fs.writeFileSync(path.resolve(".", "data", "today.txt"), today, {
        encoding: "utf8",
      });
      this.message = today;
    } else {
      client.say("ljtechdotca", this.message);
    }
  },
};
