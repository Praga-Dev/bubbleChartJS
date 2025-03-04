import { BubbleAppearance } from "./config/bubble-appearance";
import { FontOptions } from "./config/font-options";
import { ToolTipConfig } from "./config/tooltip-config";

export interface DataItem extends BubbleAppearance, FontOptions {
  label: string;
  value: number;
  toolTipConfig?: ToolTipConfig;

  // group?: string; // Groups bubbles for clustered visualization
}
