module.exports = {
  name: "today",
  message:
    "Join the Unicorn Utterances Discord! https://discord.com/invite/FMcvc6T",
  execute: function (client, user, args) {
    if (user === "ljtechdotca" && args[0] === "set") {
      this.message = args.slice(1, args.length).join(" ");
    } else {
      client.say("ljtechdotca", this.message);
    }
  },
};
