const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  isLocalBuild: process.env.APP_BUILD_MODE === "local",
  remoteEntryUrl: process.env.REMOTE_ENTRY_URL,
};
