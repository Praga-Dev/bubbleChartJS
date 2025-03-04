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

  // hoverEffect?: "scale" | "highlight" | "none"; // Hover effect type
  // clickAction?: () => void; // Function triggered on click
  // draggable?: boolean; // Enables dragging bubbles
  // resizable?: boolean; // Allows dynamic resizing
  // animation?: boolean; // Enables animations
  // animationSpeed?: number; // Animation speed
}
