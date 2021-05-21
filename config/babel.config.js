module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: {
          version: "3",
          proposals: true,
        },
        debug: false,
        targets: {
          browsers: [
            "edge >= 16",
            "safari >= 9",
            "firefox >= 57",
            "ie >= 11",
            "ios >= 9",
            "chrome >= 49",
          ],
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
  ],
};
