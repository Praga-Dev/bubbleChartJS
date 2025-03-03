export interface BubbleAppearance {
  bubbleColor?: string; // Bubble background color
  borderThickness?: number; // Border thickness
  borderColor?: string; // Border color
  opacity?: number; // 0 (transparent) to 1 (fully visible)
}

/**
 * Defines the appearance properties for a bubble.
 */
export interface BubbleAppearance {
  /**
   * Bubble background color
   * @default "#3498DB"
   */
  bubbleColor?: string;

  /**
   * Border thickness (in pixels)
   * @default 0.25
   */
  borderThickness?: number;

  /**
   * Border color
   * @default "black"
   */
  borderColor?: string;

  /**
   * Opacity level (0: transparent, 1: fully visible)
   * @validValues 0 - 1
   * @default 1
   */
  opacity?: number;
}
