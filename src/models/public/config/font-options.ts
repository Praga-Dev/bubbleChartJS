/**
 * Defines the font-related styling options.
 */
export interface FontOptions {
  /**
   * Custom font family
   * @example "Arial", "Verdana"
   * @default "Arial"
   */
  fontFamily?: string;

  /**
   * Font style
   * @validValues "normal" | "italic" | "oblique"
   * @default "normal"
   */
  fontStyle?: "normal" | "italic" | "oblique";

  /**
   * Font weight (numeric scale)
   * @validValues 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
   * @default 400
   */
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

  /**
   * Text alignment
   * @validValues "center" | "end" | "left" | "right" | "start"
   * @default "center"
   */
  textAlign?: "center" | "end" | "left" | "right" | "start";

  /**
   * Text transformation style
   * @validValues "none" | "uppercase" | "lowercase" | "capitalize"
   * @default "none"
   */
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";

  /**
   * Font color
   * @default "#000000"
   */
  fontColor?: string;

  /**
   * Text baseline position
   * @validValues "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top"
   * @default "middle"
   */
  textBaseline?:
    | "alphabetic"
    | "bottom"
    | "hanging"
    | "ideographic"
    | "middle"
    | "top";
}
