const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

//** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    // plugins: ["swc-plugin-vanilla-extract", { }],
  },
};

const withVanillaExtract = createVanillaExtractPlugin({ devMode: true });

module.exports = withVanillaExtract(nextConfig);
