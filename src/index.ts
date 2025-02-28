import { initializeChart } from "./services/chartService";

// Explicitly export for TypeScript
export { initializeChart };

// Declare the global `window` property correctly
declare global {
  interface Window {
    initializeChart: typeof initializeChart;
  }
}

// Assign to `window`
window.initializeChart = initializeChart;
