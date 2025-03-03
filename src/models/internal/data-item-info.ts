import { DataItem } from "../public/data-item";

export interface DataItemInfo extends DataItem {
  radius: number;
  x: number;
  y: number;
  fixed: boolean;
}
