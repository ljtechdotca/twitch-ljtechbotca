const path = require("path");
const fs = require("fs");

module.exports = {
  name: "today",
  message: fs.readFileSync(path.resolve(".", "data", "today.txt")),
  execute: function (client, user, args) {
    if (user === "ljtechdotca" && args[0] === "set") {
      const data = args.slice(1, args.length).join(" ");
      fs.writeFileSync(path.resolve(".", "data", "today.txt"), data, {
        encoding: "utf8",
      });
      this.message = args.slice(1, args.length).join(" ");
    } else {
      client.say("ljtechdotca", this.message);
    }
  },
};
