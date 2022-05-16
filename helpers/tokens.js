const { RefreshingAuthProvider } = require("@twurple/auth");
const { writeFileSync, readFileSync } = require("fs");
const { resolve } = require("path");

module.exports = {
  tokens: (clientId, clientSecret, fileName) => {
    const path = resolve(".", "tokens", fileName);
    const authProvider = new RefreshingAuthProvider(
      {
        clientId,
        clientSecret,
        onRefresh: (newTokenData) =>
          writeFileSync(path, JSON.stringify(newTokenData, null, 4), "utf-8"),
      },
      JSON.parse(readFileSync(path, "utf-8"))
    );
    return authProvider;
  },
};
