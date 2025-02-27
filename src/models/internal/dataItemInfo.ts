import { DataItem } from "../public/dataItem";

export interface DataItemInfo extends DataItem {
  radius: number;
  x: number;
  y: number;
  fixed: boolean;
}
