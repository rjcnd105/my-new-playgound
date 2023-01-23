import { TachometerProps } from "./index";

export const defaultPercentValueInfo = {
  min: 0,
  max: 100,
  formatter: (value: TachometerProps["value"]) => `${value.toFixed(1)}%`,
};
