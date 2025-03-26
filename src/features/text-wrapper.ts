export function getWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxLineWidth: number,
  maxAllowedLines: number | "auto" | undefined,
  radius: number,
  fontSize: number = 14, // TODO :  take all default values from constants
  fontWeight: number = 400,
  fontStyle: "normal" | "italic" | "oblique" = "normal",
  fontFamily: string = "Arial",
  horizontalPadding: number = 2,
  verticalPadding: number = 5,
  lineHeightFactor: number = 1.2,
  maxCharsPerWord: number | undefined = undefined // TODO :  need support
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
  let isWordTruncated = false;

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    // Apply font style and weight if provided
    ctx.font = `${fontWeight || ""} ${fontStyle || ""} ${fontSize}px ${fontFamily}`; // Support to optimize the textwrap incase fontweight or fontstyle are applied
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth <= maxLineWidth) {
      currentLine = testLine; // Add word to the current line
    } else {
      if (currentLine.trim()) lines.push(currentLine); // Save previous line
      currentLine = word; // Start a new line

      const currentLineWidth = ctx.measureText(currentLine).width;

      // truncate the word
      if (currentLineWidth > maxLineWidth) {
        let truncatedText = currentLine;

        while (
          ctx.measureText(truncatedText + "...").width > maxLineWidth &&
          truncatedText.length > 0
        ) {
          truncatedText = truncatedText.slice(0, -1); // Remove last character until it fits
        }

        lines.push(truncatedText + "...");
        isWordTruncated = true;
        break; // Stop if word truncated
      }
    }

    if (lines.length >= maxLines) {
      isTruncated = true;
      break; // Stop if we reach the max number of lines
    }
  }

  if (currentLine && lines.length < maxLines && !isWordTruncated) {
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
