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
  canvasContainer.appendChild(canvas);

  return canvas;
}
