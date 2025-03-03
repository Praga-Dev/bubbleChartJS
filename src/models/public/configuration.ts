import { InteractionOptions } from "./config/interaction-options";
import { TooltipOptions } from "./config/tooltip-options";
import { DataItem } from "./dataItem";

export interface Configuration extends InteractionOptions {
  canvasContainerId: string;
  data: DataItem[];

  // bubble
  minRadius: number;
  maxLines: number | "auto";
  textWrap: boolean;
  defaultBubbleColor: string;

  // font
  fontSize: number;
  defaultFontColor: string;
  defaultFontFamily: string;

  isResizeCanvasOnWindowSizeChange: boolean;
  tooltipOptions?: TooltipOptions;
}
