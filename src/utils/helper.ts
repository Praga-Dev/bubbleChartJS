export function getFontSize(
  radius: number,
  fontSize: number = 14,
  fontWeight: number = 400
) {
  const weightFactor = fontWeight >= 700 ? 1.25 : fontWeight >= 500 ? 1.1 : 1;
  const resultedFontSize = Math.min(fontSize * weightFactor, radius / 2);
  return resultedFontSize;
}
