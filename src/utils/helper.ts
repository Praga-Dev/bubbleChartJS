export function getFontSize(radius: number, defaultFontSize: number = 14) {
  return Math.min(defaultFontSize, radius / 2);
}
