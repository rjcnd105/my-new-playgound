// tailwind 3.3에서 타입스크립트 지원이 추가되었지만 아직 tailwind plugin에서 지원하지 못하여 dist폴더의 파일을 바라봐야 함
const { theme } = require("../../dist/apps/hj/index.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.tsx"],
  theme,
  plugins: [],
};
