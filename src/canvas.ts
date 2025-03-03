import { AppConstants } from "./constants/appConstants";
import { Configuration } from "./models/public/configuration";

/**
 * Creates and initializes the canvas inside the specified container.
 */
export function createCanvas(config: Configuration): HTMLCanvasElement | null {
  const canvasContainer = document.getElementById(config.canvasContainerId);
  if (!canvasContainer) {
    console.error(
      `Canvas container with ID '${config.canvasContainerId}' not found.`
    );
    return null;
  }

  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = canvasContainer.offsetWidth;
  canvas.height = canvasContainer.offsetHeight;

  console.log(config.canvasBackgroundColor);

  Object.assign(canvas.style, {
    border: config.canvasBorderColor?.trim()
      ? `1px solid #${config.canvasBorderColor}`
      : AppConstants.TRANSPARENT,
    background: config.canvasBackgroundColor?.trim()
      ? `#${config.canvasBackgroundColor}`
      : AppConstants.TRANSPARENT,
    width: "100%",
    height: "100%",
    display: "block",
    imageRendering: "crisp-edges",
    aspectRatio: "1 / 1",
  });

  // Browser-specific image-rendering properties
  canvas.style.setProperty("image-rendering", "-moz-crisp-edges");
  canvas.style.setProperty("image-rendering", "-webkit-optimize-contrast");
  canvas.style.setProperty("-ms-interpolation-mode", "nearest-neighbor");

  canvasContainer.appendChild(canvas);

  return canvas;
}
