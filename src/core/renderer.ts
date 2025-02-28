import { Configuration } from "../models/public/configuration";
import { getWrappedLines } from "../features/textWrapper";
import { createTooltipElement, handleMouseMove } from "../features/tooltip";
import { validateConfig } from "../utils/validation";
import { createCanvas } from "../canvas";
import { getChartData } from "../services/renderService";
import { getFontSize } from "../utils/helper";

export function renderChart(config: Configuration) {
  if (!validateConfig(config)) return;

  // Create & setup canvas
  let canvas = createCanvas(config.canvasContainerId);
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
      const color = config.colorMap[item.label] || config.defaultBubbleColor;

      // Ensure radius is at least minRadius
      const radius = Math.max(item.radius, config.minRadius);

      ctx.beginPath();
      ctx.arc(item.x, item.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.strokeStyle = "black"; // Border color
      ctx.lineWidth = 0.25; // Border thickness
      ctx.stroke(); // Apply border

      // Text styling
      ctx.fillStyle = config.fontColor;
      const fontSize = getFontSize(radius, config.fontSize);
      ctx.font = `${fontSize}px ${config.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const padding = 5; // Padding around text
      const maxWidth = radius * 1.5 - padding * 2; // Adjusted for padding

      if (config.textWrap) {
        // Calculate vertical position for lines
        const lineHeight = fontSize * 1.2;

        // Dynamically determine lines if maxLines is not set
        const lines = getWrappedLines(
          ctx,
          item.label,
          maxWidth,
          config.maxLines,
          radius
        );
        const startY = item.y - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
          ctx.fillText(line, item.x, startY + index * lineHeight);
        });
      } else {
        ctx.fillText(item.label, item.x, item.y);
      }
    });
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
    const tooltip = createTooltipElement(config.canvasContainerId);
    let animationFrameId: number | null = null;
    canvas.addEventListener("mousemove", (event) => {
      if (animationFrameId) return; // Prevent excessive calls
      animationFrameId = requestAnimationFrame(() => {
        handleMouseMove(event, sortedData, canvas, tooltip);
        animationFrameId = null; // Reset after execution
      });
    });
  }
}
