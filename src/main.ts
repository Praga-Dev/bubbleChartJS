import { initializeChart } from "./services/chartService";

// export { initializeChart };
// @ts-ignore (Ignore TypeScript error for missing window prop)
window.initializeChart = initializeChart as any;
