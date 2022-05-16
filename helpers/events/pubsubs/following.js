module.exports = {
  followingListener: async (userId, pubSubClient) =>
    await pubSubClient.onCustomTopic(
      userId,
      "following",
      (message) => {
        console.log(
          `${message.data["display_name"]} just followed ljtechdotca!`
        );
      },
      "user:read:follows"
    ),
};
