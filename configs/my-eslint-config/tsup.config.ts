import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    parts: "src/parts/index.ts",
    configs: "src/configs/index.ts",
  },
  splitting: false,
  sourcemap: true,
  bundle: true,
  outDir: "dist",
  dts: true,
  clean: true,
  format: ["esm", "cjs"],
  minify: true,
  shims: true,
  tsconfig: "tsconfig.build.json",
});
