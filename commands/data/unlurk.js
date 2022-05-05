let lurkers = require("../../data/lurkers.json");
let fs = require("fs");
let path = require("path");

module.exports = {
  name: "unlurk",
  message: " has returned. Welcome back! ljtechHype",
  execute: function (client, user, args) {
    if (lurkers[user]) {
      client.say("ljtechdotca", "@" + user + this.message);
      delete lurkers[user];
      fs.writeFileSync(
        path.resolve(".", "data", "lurkers.json"),
        JSON.stringify(lurkers)
      );
      console.log({ lurkers });
    }
  },
};
