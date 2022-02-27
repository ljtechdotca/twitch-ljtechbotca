module.exports = {
  name: "lurk",
  message: " is now lurking. They will be missed ljtechGasp",
  execute: function (client, user, args) {
    client.say("ljtechdotca", "@" + user + this.message);
  },
};
