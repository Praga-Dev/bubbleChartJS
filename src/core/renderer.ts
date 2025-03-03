import { Configuration } from "../models/public/configuration";
import { getWrappedLines } from "../features/text-wrapper";
import { createTooltipElement, handleMouseMove } from "../features/tooltip";
import { validateConfig } from "../utils/validation";
import { createCanvas } from "../canvas";
import { getChartData } from "../services/render-service";
import { getFontSize } from "../utils/helper";
import { DataItemInfo } from "../models/internal/data-item-info";

export function renderChart(config: Configuration) {
  if (!validateConfig(config)) return;

  // Create & setup canvas
  let canvas = createCanvas(config);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Invalid context");
    return;
  }

  const sortedData = getChartData(config, canvas, ctx);

  function draw() {
    if (!canvas || !ctx) {
      console.warn("canvas or ctx is not valid");
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sortedData.forEach((item) => {
      const {
        x,
        y,
        radius,
        bubbleColor,
        borderColor,
        borderThickness,
        opacity,
        fontColor,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        textAlign,
        textTransform,
        textBaseline,
      } = getDefaultValues(item, config);

      // Set opacity for the bubble only
      // if(opacity){
      //   ctx.save(); // Save canvas state
      //   ctx.globalAlpha = opacity;
      // }

      // Draw bubble
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = bubbleColor;
      ctx.fill();

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderThickness;
      ctx.stroke();

      // Text styling
      ctx.fillStyle = fontColor;
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;

      // Transform text (uppercase, lowercase, capitalize)
      let labelText = item.label || "";
      if (textTransform === "uppercase") labelText = labelText.toUpperCase();
      else if (textTransform === "lowercase")
        labelText = labelText.toLowerCase();
      else if (textTransform === "capitalize")
        labelText = labelText.replace(/\b\w/g, (c) => c.toUpperCase());

      // ctx.restore(); // Restore previous state (removes opacity effect)

      // Handle text wrapping if enabled
      if (config.textWrap) {
        const padding = 5;
        const maxWidth = radius * 1.5 - padding * 2;
        const lineHeight = fontSize * 1.2;

        const lines = getWrappedLines(
          ctx,
          item.label,
          maxWidth,
          config.maxLines,
          radius
        );
        const startY = y - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) =>
          ctx.fillText(line, x, startY + index * lineHeight)
        );
      } else {
        ctx.fillText(item.label, x, y);
      }
    });
  }

  /**
   * Returns an object with default values for bubble properties.
   * If a property is provided, it retains its original value.
   */
  function getDefaultValues(item: DataItemInfo, config: Configuration) {
    const ctxStyleConfig = {
      // Bubble properties
      x: item.x,
      y: item.y,
      radius: Math.max(item.radius, config.minRadius), // Ensure minimum radius
      bubbleColor: item.bubbleColor ?? config.defaultBubbleColor,
      borderColor: item.borderColor ?? "black",
      borderThickness: item.borderThickness ?? 0.25,
      opacity: item.opacity ?? 1, // Default opacity to 1 (fully visible)

      // Font properties
      fontFamily: item.fontFamily ?? config.defaultFontFamily,
      fontStyle: item.fontStyle ?? "normal",
      fontWeight: item.fontWeight ?? 400,
      textAlign: item.textAlign ?? "center",
      textTransform: item.textTransform ?? "none",
      fontColor: item.fontColor ?? config.defaultFontColor,
      textBaseline: item.textBaseline ?? "middle",
      fontSize: getFontSize(item.radius, config.fontSize, item.fontWeight),
    };
    return ctxStyleConfig;
  }

  // Robust approach that handles resizing:
  function resizeCanvas() {
    const canvasContainer = document.getElementById(config.canvasContainerId);
    if (canvasContainer && canvas) {
      canvas.width = canvasContainer.offsetWidth;
      canvas.height = canvasContainer.offsetHeight;
      draw(); // Call your drawing function
    }
  }

  if (config.isResizeCanvasOnWindowSizeChange) {
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", resizeCanvas); // Resize on window resize
  }

  // Initial draw
  draw();

  if (config.showToolTip) {
    const tooltip = createTooltipElement(config);
    let animationFrameId: number | null = null;
    canvas.addEventListener("mousemove", (event) => {
      if (animationFrameId) return; // Prevent excessive calls
      animationFrameId = requestAnimationFrame(() => {
        handleMouseMove(event, sortedData, canvas, tooltip, config);
        animationFrameId = null; // Reset after execution
      });
    });
  }
}
