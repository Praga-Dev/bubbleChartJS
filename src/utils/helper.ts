export function getFontSize(
  radius: number,
  fontSize: number = 14,
  fontWeight: number = 400,
  avgCharsPerLine: number = 6
) {
  const weightFactor = fontWeight >= 700 ? 1.25 : fontWeight >= 500 ? 1.1 : 1;

  // Adjust max font size to allow better scaling for large bubbles
  const maxFontSize = Math.min(radius / avgCharsPerLine, radius / 1.2); // Looser constraint

  let resultedFontSize = Math.min(
    fontSize * weightFactor,
    maxFontSize,
    radius * 0.8
  ); // Allow larger fonts for big bubbles

  // Dynamic min size: ensures readability for small bubbles
  resultedFontSize = Math.max(resultedFontSize, Math.max(8, radius / 6));
  return Math.round(resultedFontSize);
}

export function isFontAvailable(font: string, fontSize = "16px") {
  return document.fonts?.check(`${fontSize} ${font}`);
}
