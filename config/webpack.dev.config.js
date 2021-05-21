const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIRECTORY = process.cwd();

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.resolve(ROOT_DIRECTORY, "build"),
    compress: true,
    port: 3000,
    overlay: true,
    host: "0.0.0.0",
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            configFile: path.resolve(ROOT_DIRECTORY, "config/babel.config.js"),
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-flexbugs-fixes"),
                  require("postcss-preset-env")({
                    stage: 2,
                    features: {
                      "nesting-rules": true,
                      "prefers-color-scheme-query": true,
                    },
                    autoprefixer: {
                      flexbox: "no-2009",
                      grid: "autoplace",
                    },
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: "[name]__[local]--[contenthash:8]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-flexbugs-fixes"),
                  require("postcss-preset-env")({
                    stage: 2,
                    features: {
                      "nesting-rules": true,
                      "prefers-color-scheme-query": true,
                    },
                    autoprefixer: {
                      flexbox: "no-2009",
                      grid: "autoplace",
                    },
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-flexbugs-fixes"),
                  require("postcss-preset-env")({
                    stage: 2,
                    features: {
                      "nesting-rules": true,
                      "prefers-color-scheme-query": true,
                    },
                    autoprefixer: {
                      flexbox: "no-2009",
                      grid: "autoplace",
                    },
                  }),
                ],
              },
            },
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: "[name]__[local]--[contenthash:8]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-flexbugs-fixes"),
                  require("postcss-preset-env")({
                    stage: 2,
                    features: {
                      "nesting-rules": true,
                      "prefers-color-scheme-query": true,
                    },
                    autoprefixer: {
                      flexbox: "no-2009",
                      grid: "autoplace",
                    },
                  }),
                ],
              },
            },
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              limit: 4096,
              outputPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
    ],
  },
};
