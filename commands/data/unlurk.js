let lurkers = require("../../data/lurkers.json");
let fs = require("fs");
let path = require("path");

module.exports = {
  name: "unlurk",
  description: "Links you my Twitter profile.",
  message: function (user) {
    return `@${user} has returned. Welcome back! ljtechGasp`;
  },
  execute: function (client, { args, user }) {
    if (lurkers[user]) {
      delete lurkers[user];
      fs.writeFileSync(
        path.resolve(".", "data", "lurkers.json"),
        JSON.stringify(lurkers)
      );
      client.say("ljtechdotca", this.message(user));
    }
  },
};
