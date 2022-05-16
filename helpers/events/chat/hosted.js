module.exports = {
  hostedListener: (chatClient) =>
    chatClient.onHosted((hostedEvent) => {
      console.log({ hostedEvent });
    }),
};
