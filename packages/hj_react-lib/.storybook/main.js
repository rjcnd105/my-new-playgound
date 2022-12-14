const path = require("path");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  core: {
    builder: 'webpack5',
  },
  features: { storyStoreV7: true,  babelModeV7: true, },
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  devtool: "eval-source-map",
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.devtool = "eval-source-map";

    // vanilla extract webpack setup as seen here: https://vanilla-extract.style/documentation/integrations/webpack/
    config.plugins.push(new VanillaExtractPlugin());
    config.plugins.push(new MiniCssExtractPlugin());

    config.module.rules.push({
      test: /\.vanilla\.css$/i, // Targets only CSS files generated by vanilla-extract
      include: path.resolve(__dirname, "../src"),
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve("css-loader"),
          options: {
            url: false, // Required as image imports should be handled via JS/TS import statements
          },
        },
      ],
    });

    return config;
  },
}