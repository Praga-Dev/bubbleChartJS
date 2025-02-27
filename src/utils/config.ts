import { Configuration } from "../models/public/configuration";

/**
 * Default configuration object.
 */
export const DEFAULT_CONFIG: Omit<Configuration, "canvasContainerId" | "data"> =
  {
    colorMap: {},
    defaultBubbleColor: "#3498db",
    fontColor: "#ffffff",
    minRadius: 10,
    maxLines: 3,
    textWrap: true,
    isResizeCanvasOnWindowSizeChange: true,
    fontSize: 14,
    fontFamily: "Arial",
    showToolTip: true,
  };

/**
 * Merges user config with defaults, ensuring `canvasContainerId` and `data` are required.
 */
export function mergeConfig(
  customConfig: {
    canvasContainerId: string;
    data: Configuration["data"];
  } & Partial<Configuration>
): Configuration {
  return {
    ...DEFAULT_CONFIG,
    ...customConfig,
  };
}
