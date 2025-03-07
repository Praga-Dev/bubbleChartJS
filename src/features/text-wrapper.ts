export function getWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxLineWidth: number,
  maxAllowedLines: number | "auto" | undefined,
  radius: number,
  maxCharsPerWord: number | undefined = undefined,
  fontSize: number = 14,
  horizontalPadding: number = 5,
  verticalPadding: number = 5,
  lineHeightFactor: number = 1.2
): string[] {
  const availableHeight = 1.5 * (radius - verticalPadding);
  const lineHeight = fontSize * lineHeightFactor;

  const calculatedMaxLines = Math.max(
    1,
    Math.floor(availableHeight / lineHeight)
  );

  const maxLines =
    maxAllowedLines === "auto" || maxAllowedLines === undefined
      ? calculatedMaxLines
      : Math.min(maxAllowedLines, calculatedMaxLines);

  // Adjust max line width by removing horizontal padding
  maxLineWidth = Math.max(0, maxLineWidth - horizontalPadding);

  // Break text into words
  const words = text.split(" ");

  let currentLine = "";
  const lines: string[] = [];
  let isTruncated = false;

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth <= maxLineWidth) {
      currentLine = testLine; // Add word to the current line
    } else {
      if (currentLine.trim()) lines.push(currentLine); // Save previous line
      currentLine = word; // Start a new line
    }

    if (lines.length >= maxLines) {
      isTruncated = true;
      break; // Stop if we reach the max number of lines
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine); // Push the last line if space allows
  }

  // Add "..." if text is truncated
  if (isTruncated && lines.length > 0) {
    const lastLine = lines[lines.length - 1];
    let truncatedText = lastLine;

    while (
      ctx.measureText(truncatedText + "...").width > maxLineWidth &&
      truncatedText.length > 0
    ) {
      truncatedText = truncatedText.slice(0, -1); // Remove last character until it fits
    }

    lines[lines.length - 1] = truncatedText + "...";
  }
  return lines;
}
