import { DataItemInfo } from "../models/internal/data-item-info";
import { Configuration } from "../models/public/configuration";

let cursor: string = "default";

function appendTooltip(tooltip: HTMLDivElement) {
  const body = document.body;

  if (body) {
    // Insert the new div as the first child of the body
    if (body.firstChild) {
      body.insertBefore(tooltip, body.firstChild);
    } else {
      // If the body is empty, append the new div
      body.appendChild(tooltip);
    }
  } else {
    console.error("Body element not found.");
  }
}

export function createTooltipElement(config: Configuration): HTMLDivElement {
  const formattedToolTip =
    config.data[0].toolTipConfig?.tooltipFormattedData?.trim();
  if (formattedToolTip) {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = formattedToolTip.trim();

    // Append to DOM
    const tooltip = tempContainer.firstElementChild as HTMLDivElement;
    appendTooltip(tooltip);
    return tooltip;
  }

  const tooltip = document.createElement("div");
  tooltip.id = "bubbleChartTooltip";
  tooltip.style.display = "none";

  const tooltipOptions = config?.tooltipOptions ?? {};

  // Helper functions (updated for new requirements)
  const getCssValue = (
    value: string | number | undefined,
    defaultValue: string
  ): string => {
    if (typeof value === "number") return `${value}px`; // Fallback for number inputs
    return value ?? defaultValue;
  };

  const getBorderValue = () => {
    if (!tooltipOptions.borderStyle) return "none";
    const width = getCssValue(tooltipOptions.borderWidth, "1px");
    const color = tooltipOptions.borderColor ?? "transparent";
    return `${width} ${tooltipOptions.borderStyle} ${color}`;
  };

  // Apply styles
  Object.assign(tooltip.style, {
    position: "absolute",
    padding: getCssValue(tooltipOptions.padding, "8px"),
    margin: getCssValue(tooltipOptions.margin, "0"),
    background: tooltipOptions.backgroundColor ?? "rgba(0, 0, 0, 0.85)",
    color: tooltipOptions.fontColor ?? "white",
    borderRadius: "4px",
    pointerEvents: tooltipOptions.pointerEvents ?? "none",
    fontFamily: tooltipOptions.fontFamily ?? "Arial, sans-serif",
    fontSize: getCssValue(tooltipOptions.fontSize, "14px"),
    fontWeight: String(tooltipOptions.fontWeight ?? "400"),
    fontStyle: tooltipOptions.fontStyle ?? "normal",
    textAlign: tooltipOptions.textAlign ?? "left",
    textDecoration: tooltipOptions.textDecoration ?? "none",
    textTransform: tooltipOptions.textTransform ?? "none",
    letterSpacing: getCssValue(tooltipOptions.letterSpacing, "normal"),
    border: getBorderValue(),
    boxShadow: tooltipOptions.boxShadow ?? "none",
    opacity: String(tooltipOptions.opacity ?? 1),
    maxWidth: getCssValue(tooltipOptions.maxWidth, "200px"),
    minWidth: getCssValue(tooltipOptions.minWidth, "auto"),
    maxHeight: getCssValue(tooltipOptions.maxHeight, "none"),
    minHeight: getCssValue(tooltipOptions.minHeight, "auto"),
    zIndex: String(tooltipOptions.zIndex ?? 1000),
    transition: tooltipOptions.transition ?? "opacity 0.2s",
    transform: tooltipOptions.transform ?? "none",
    backdropFilter: tooltipOptions.backdropFilter ?? "none",
  });

  // Append to DOM
  appendTooltip(tooltip);
  return tooltip;
}

export function handleMouseMove(
  event: MouseEvent,
  data: DataItemInfo[],
  canvas: HTMLCanvasElement,
  tooltip: HTMLDivElement,
  config: Configuration
) {
  const { mouseX, mouseY } = getMousePosition(event, canvas);
  const hoveredItem = findHoveredItem(mouseX, mouseY, data);

  if (config?.cursorType) {
    cursor = config?.cursorType;
  }

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
  if (hovered && hovered.value && canvas && tooltip) {
    canvas.style.cursor = cursor;
    tooltip.style.display = "block";
    tooltip.innerHTML = getToolTipData(hovered);
    tooltip.style.left = `${event.pageX + 15}px`;
    tooltip.style.top = `${event.pageY - 30}px`;
    tooltip.style.zIndex = "9999";
  }
}

function getToolTipData(data: DataItemInfo): string {
  if (!data) return "";
  const toolTipText = data.toolTipConfig?.tooltipText?.trim();
  if (toolTipText) {
    return `<div>${toolTipText}</div>`;
  }

  const label = data.label?.trim();
  if (label) {
    return `<div>${label}<br>Value: ${data.value}</div>`;
  }

  return `<div>${data.value}</div>`;
}
