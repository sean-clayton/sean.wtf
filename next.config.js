const isProd = process.env.NODE_ENV === "production";

const withTM = require("next-transpile-modules");

module.exports = withTM(["lodash-es"])({
  assetPrefix: isProd ? "https://www.sean.wtf" : "",
});
