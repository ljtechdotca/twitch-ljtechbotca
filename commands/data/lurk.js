let lurkers = require("../../data/lurkers.json");
let fs = require("fs");
let path = require("path");

module.exports = {
  name: "lurk",
  message: "They will be missed ljtechGasp",
  execute: function (client, user, args) {
    if (lurkers[user] === undefined) {
      client.say(
        "ljtechdotca",
        "@" + user + " is now lurking. " + this.message
      );
      lurkers[user] = user;
      fs.writeFileSync(
        path.resolve(".", "data", "lurkers.json"),
        JSON.stringify(lurkers)
      );
      console.log({lurkers});
    } else {
      client.say(
        "ljtechdotca",
        "@" + user + " is still lurking. " + this.message
      );
    }
  },
};
