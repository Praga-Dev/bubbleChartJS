export interface InteractionOptions {
  showToolTip?: boolean;
  isResizeCanvasOnWindowSizeChange?: boolean;
  cursorType?:
    | "default"
    | "pointer"
    | "grab"
    | "crosshair"
    | "move"
    | "not-allowed"
    | "help"; // Allows customizing the cursor when hovering over bubbles

  onBubbleClick?: (bubbleData: any, event: MouseEvent) => void; // Function triggered on click
  // hoverEffect?: "scale" | "highlight" | "none"; // Hover effect type
  // draggable?: boolean; // Enables dragging bubbles
  // resizable?: boolean; // Allows dynamic resizing
  // animation?: boolean; // Enables animations
  // animationSpeed?: number; // Animation speed
}
