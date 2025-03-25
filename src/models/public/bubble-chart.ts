import { renderChart } from "../../core/renderer";
import { initializeChart } from "../../services/chart-service";
import { Configuration } from "./configuration";

export class BubbleChart {
  configuration!: Configuration;
  constructor(config: Configuration) {
    const configData = initializeChart(config);
    if (!configData) return; // the logs are handled by initializeChart TODO add log/error-handler service;

    this.configuration = configData;
  }

  render(): void {
    if (this.configuration) {
      renderChart(this.configuration);
    }
  }
}
