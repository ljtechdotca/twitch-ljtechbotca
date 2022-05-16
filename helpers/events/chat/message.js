const format = require("../../../helpers/format");

module.exports = {
  messageListener: (commands, chatClient) => {
    chatClient.onMessage((_channel, user, message, msg) => {
      format.chat(user, message, msg.userInfo.color);
      const newCmd = format.command(message);
      if (!newCmd) {
        commands.unlurk.execute(chatClient, user);
        return;
      }
      const cmd = commands[newCmd.name];
      if (!cmd) return;
      cmd.execute(chatClient, { args: newCmd.args, user });
    });
  },
};
