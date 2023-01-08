import "./globalStyle.css";
import * as d3 from "d3";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

if (typeof globalThis !== "undefined") globalThis.d3 = d3;
