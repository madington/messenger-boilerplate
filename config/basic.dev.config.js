const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ROOT_DIRECTORY = process.cwd();

const devConfig = require("./webpack.dev.config.js");

module.exports = Object.assign({}, devConfig, {
  entry: {
    ad: path.resolve(ROOT_DIRECTORY, "src/examples/basic.js"),
    previewer: path.resolve(ROOT_DIRECTORY, "src/previewer.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/examples/basic.html"),
      filename: "ad.html",
      chunks: ["ad"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/previewer.html"),
      filename: "index.html",
      chunks: ["previewer"],
    }),
  ],
});
