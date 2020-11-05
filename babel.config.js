module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react"],
    ["rsuite", { style: true, theme: "dark" }],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-transform-typescript",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
  ],
  env: {
    development: {
      presets: [["@babel/preset-react", { development: true }]],
    },
  },
};
