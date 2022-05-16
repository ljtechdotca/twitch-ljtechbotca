module.exports = {
  raidListener: (chatClient) =>
    chatClient.onRaid((raidEvent) => {
      console.log({ raidEvent });
    }),
};
