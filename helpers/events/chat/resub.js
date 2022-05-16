module.exports = {
  resubListener: (chatClient) =>
    chatClient.onResub((resubEvent) => {
      console.log({ resubEvent });
    }),
};
