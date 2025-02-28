/**
 * Creates and initializes the canvas inside the specified container.
 */
export function createCanvas(containerId: string): HTMLCanvasElement | null {
  const canvasContainer = document.getElementById(containerId);
  if (!canvasContainer) {
    console.error(`Canvas container with ID '${containerId}' not found.`);
    return null;
  }

  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = canvasContainer.offsetWidth;
  canvas.height = canvasContainer.offsetHeight;

  Object.assign(canvas.style, {
    border: "1px solid #ddd",
    background: "#f8f8f8",
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
