const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ROOT_DIRECTORY = process.cwd();

const prodConfig = require("./webpack.prod.config.js");

module.exports = Object.assign({}, prodConfig, {
  entry: {
    ad: path.resolve(ROOT_DIRECTORY, "src/examples/basic.js"),
    previewer: path.resolve(ROOT_DIRECTORY, "src/previewer.js"),
  },
  output: {
    path: path.resolve(ROOT_DIRECTORY, "dist_basic"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    ...prodConfig.plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/previewer.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: false,
        minifyCSS: true,
        minifyURLs: true,
      },
      templateParameters: {
        baseRef: "",
      },
      chunks: ["previewer"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/examples/basic.html"),
      filename: "ad.html",
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: false,
        minifyCSS: true,
        minifyURLs: true,
      },
      templateParameters: {
        baseRef: "",
      },
      chunks: ["ad"],
    }),
  ],
});
