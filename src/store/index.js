import { proxy } from "valtio";

export const state = proxy({
  delay: 500,
  ArraySize: 20,
  AlgoSelected: "Regression",
  isRunning: false,
});
