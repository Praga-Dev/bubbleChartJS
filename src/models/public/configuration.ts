import { DataItem } from "./dataItem";

export interface Configuration {
  canvasContainerId: string;
  data: DataItem[];
  colorMap: Record<string, string>;
  defaultBubbleColor: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  minRadius: number;
  maxLines: number;
  textWrap: boolean;
  isResizeCanvasOnWindowSizeChange: boolean;
  showToolTip: boolean;
}
