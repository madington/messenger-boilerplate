const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ROOT_DIRECTORY = process.cwd();

const devConfig = require("./webpack.dev.config.js");

module.exports = Object.assign({}, devConfig, {
  entry: {
    slider: path.resolve(ROOT_DIRECTORY, "src/examples/slider.js"),
    previewer: path.resolve(ROOT_DIRECTORY, "src/previewer.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/examples/slider.html"),
      filename: "ad.html",
      chunks: ["slider"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/previewer.html"),
      filename: "index.html",
      chunks: ["previewer"],
    }),
  ],
});
