import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  splitting: false,
  sourcemap: false,
  outDir: "dist",
  dts: true,
  clean: true,
  format: ["esm", "cjs"],
  minify: true,
  tsconfig: "tsconfig.build.json",
});
