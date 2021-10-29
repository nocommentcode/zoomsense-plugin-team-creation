let ImportHttpWebpackPlugin = require("import-http/webpack");

module.exports = {
  configureWebpack: {
    plugins: [new ImportHttpWebpackPlugin()],
  },
};
