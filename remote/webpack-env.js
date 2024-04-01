const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  isLocalBuild: process.env.APP_BUILD_MODE === "local",
};
