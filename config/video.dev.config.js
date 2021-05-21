const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ROOT_DIRECTORY = process.cwd();

const devConfig = require("./webpack.dev.config.js");

module.exports = Object.assign({}, devConfig, {
  entry: {
    video: path.resolve(ROOT_DIRECTORY, "src/examples/video.js"),
    previewer: path.resolve(ROOT_DIRECTORY, "src/previewer.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/examples/video.html"),
      filename: "ad.html",
      chunks: ["video"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/previewer.html"),
      filename: "index.html",
      chunks: ["previewer"],
    }),
  ],
});
