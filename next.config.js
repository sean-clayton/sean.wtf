const withTM = require("next-transpile-modules");

module.exports = withTM(["lodash-es"])({
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});
