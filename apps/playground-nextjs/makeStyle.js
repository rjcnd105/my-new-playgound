const {
  vanillaExtractPlugin
} = require('@vanilla-extract/esbuild-plugin');

require('esbuild')
  .build({
    entryPoints: ['./src/styles/index.ts'],
    platform: "browser",
    bundle: true,
    plugins: [vanillaExtractPlugin()],
    outdir: "dist"
  })
  .catch(() => process.exit(1));