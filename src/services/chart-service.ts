import { renderChart } from "../core/renderer";
import { Configuration } from "../models/public/configuration";
import { mergeConfig } from "../utils/config";

/**
 * Initializes the chart, but stops execution if no valid data is provided.
 */
export function initializeChart(
  config: Partial<Configuration> = {}
): Configuration | undefined {
  if (!config) {
    console.error("Configuration is not valid. Chart initialization aborted.");
    return;
  }

  if (!config.data || config.data.length === 0) {
    console.error("No valid data provided. Chart initialization aborted.");
    return;
  }

  const safeConfig = {
    canvasContainerId: config.canvasContainerId ?? "chart-container",
    data: config.data ?? [],
    ...config,
  };

  const finalConfig = mergeConfig(safeConfig);
  renderChart(finalConfig);
  return finalConfig;
}
