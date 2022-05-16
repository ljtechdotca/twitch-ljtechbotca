module.exports = {
  redemptionListener: async (userId, pubSubClient) => {
    await pubSubClient.onRedemption(userId, (message) => {
      console.log(
        `${message.userDisplayName} just redeemed ${message.rewardTitle}!`
      );
    });
  },
};
