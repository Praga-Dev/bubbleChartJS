import { Configuration } from "../models/public/configuration";

/**
 * Default configuration object.
 */
export const DEFAULT_CONFIG: Omit<Configuration, "canvasContainerId" | "data"> =
  {
    defaultBubbleColor: "#3498DB",
    defaultFontColor: "#ffffff",
    minRadius: 10,
    maxLines: "auto",
    textWrap: true,
    isResizeCanvasOnWindowSizeChange: true,
    fontSize: 14,
    defaultFontFamily: "Arial",
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
