module.exports = {
  name: "so",
  message: "Go checkout and follow ",
  execute: function (client, user, args) {
    if (user === "ljtechdotca") {
      client.say(
        "ljtechdotca",
        this.message + `${args[0]} @ https://www.twitch.tv/${args[0]}`
      );
    }
  },
};
