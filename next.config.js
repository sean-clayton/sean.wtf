const withTM = require("next-transpile-modules");

module.exports = withTM(["lodash-es"])({
  trailingSlash: true,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
});
