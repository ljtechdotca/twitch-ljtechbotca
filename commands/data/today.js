module.exports = {
  name: "today",
  message: "✨ Nothing is happening today!",
  execute: function (client, user, args) {
    if (user === "ljtechdotca" && args[0] === "set") {
      this.message = args.slice(1, args.length).join(" ");
    } else {
      client.say("ljtechdotca", this.message);
    }
  },
};
