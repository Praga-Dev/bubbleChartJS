import { Configuration } from "../models/public/configuration";
import { renderChart } from "../core/renderer";
import { mergeConfig } from "../utils/config";

/**
 * Initializes the chart, but stops execution if no valid data is provided.
 */
export function initializeChart(config: Partial<Configuration> = {}): void {
  if (!config.data || config.data.length === 0) {
    console.warn(
      "initializeChart: No valid data provided. Chart initialization aborted."
    );
    return;
  }

  const safeConfig = {
    canvasContainerId: config.canvasContainerId ?? "chart-container",
    data: config.data ?? [],
    ...config,
  };

  const finalConfig = mergeConfig(safeConfig);
  renderChart(finalConfig);
}
