import { initializeChart } from "./services/chart-service";

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
