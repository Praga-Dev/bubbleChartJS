import { DataItemInfo } from "../models/internal/dataItemInfo";

// let hoveredItem: DataItemInfo | null = null;

export function handleMouseMove(
  event: MouseEvent,
  data: DataItemInfo[],
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement
) {
  const { mouseX, mouseY } = getMousePosition(event, canvas);
  const hoveredItem = findHoveredItem(mouseX, mouseY, data);

  if (hoveredItem) {
    updateTooltip(event, hoveredItem, canvas, tooltip);
  } else {
    canvas.style.cursor = "default";
    tooltip.style.display = "none";
  }
}

/**
 * Gets the mouse position relative to the canvas.
 */
function getMousePosition(event: MouseEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  return {
    mouseX: event.clientX - rect.left,
    mouseY: event.clientY - rect.top,
  };
}

/**
 * Finds the hovered item based on proximity to circles.
 */
function findHoveredItem(mouseX: number, mouseY: number, data: DataItemInfo[]) {
  return (
    data.find(
      (item) => Math.hypot(mouseX - item.x, mouseY - item.y) < item.radius
    ) || null
  );
}

/**
 * Updates the tooltip and cursor based on the hovered item.
 */
function updateTooltip(
  event: MouseEvent,
  hovered: DataItemInfo | null,
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement
) {
  if (hovered?.label && hovered?.value && canvas && tooltip) {
    canvas.style.cursor = "pointer";
    tooltip.style.display = "block";
    tooltip.innerHTML = `<div>${hovered.label}<br>Value: ${hovered.value}</div>`;
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY - 30}px`;
    tooltip.style.zIndex = "9999";
  }
}
