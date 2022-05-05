let lurkers = require("../../data/lurkers.json");
let fs = require("fs");
let path = require("path");

module.exports = {
  name: "lurk",
  description: "Tell chat you are AFK.",
  message: function (newLurker, user) {
    if (newLurker) {
      return `@${user} is now lurking. They will be missed. ljtechGasp`;
    } else {
      return `@${user} is still lurking. ljtechGasp`;
    }
  },
  execute: function (client) {
    if (lurkers[user] === undefined) {
      lurkers[user] = user;
      fs.writeFileSync(
        path.resolve(".", "data", "lurkers.json"),
        JSON.stringify(lurkers)
      );
      client.say("ljtechdotca", this.message(true, user));
    } else {
      client.say("ljtechdotca", this.message(false, user));
    }
  },
};
