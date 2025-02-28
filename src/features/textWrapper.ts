export function getWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxLineWidth: number,
  maxAllowedLines: number | undefined,
  circleRadius: number,
  maxCharsPerWord: number | undefined = undefined
): string[] {
  if (!text || maxLineWidth <= 0) return [];

  let words = text.split(/\s+/);

  // Set default for maxAllowedLines based on available space
  maxAllowedLines = determineMaxLines(
    ctx,
    maxAllowedLines,
    circleRadius,
    maxLineWidth
  );

  // Handle single-word case separately
  if (words.length === 1) {
    return [truncateTextToFit(ctx, words[0], maxLineWidth)];
  }

  if (maxCharsPerWord) {
    // For Now dont allow default word truncation
    // Set default for maxCharsPerWord if not provided
    maxCharsPerWord = determineMaxCharsPerWord(
      ctx,
      maxCharsPerWord,
      maxLineWidth
    );

    // Apply maxCharsPerWord truncation if needed
    words = words.map((word) => truncateWord(word, maxCharsPerWord!));
  }

  return wrapTextIntoLines(ctx, words, maxLineWidth, maxAllowedLines);
}

/**
 * Determines maxAllowedLines based on available space.
 */
function determineMaxLines(
  ctx: CanvasRenderingContext2D,
  maxAllowedLines: number | undefined,
  circleRadius: number, // TODO later account circleRadius to handleLabeltext-NoOfLines
  maxLineWidth: number
): number {
  if (maxAllowedLines && maxAllowedLines > 0) return maxAllowedLines;

  const fontSize = parseInt(ctx.font, 10) || 16;
  const lineHeight = fontSize * 1.2;
  return Math.floor(maxLineWidth / lineHeight) || 1; // Default: Fit within maxLineWidth
}

/**
 * Determines maxCharsPerWord based on maxLineWidth.
 */
function determineMaxCharsPerWord(
  ctx: CanvasRenderingContext2D,
  maxCharsPerWord: number | undefined,
  maxLineWidth: number
): number {
  if (maxCharsPerWord && maxCharsPerWord > 0) return maxCharsPerWord;

  const avgCharWidth = ctx.measureText("W").width || 8; // Approximate avg char width
  return Math.floor(maxLineWidth / avgCharWidth); // Default: Fit within maxLineWidth
}

/**
 * Wraps text into multiple lines within maxLineWidth.
 */
function wrapTextIntoLines(
  ctx: CanvasRenderingContext2D,
  words: string[],
  maxLineWidth: number,
  maxAllowedLines: number
): string[] {
  const wrappedLines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth <= maxLineWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) wrappedLines.push(currentLine);
      currentLine = word;
      if (wrappedLines.length >= maxAllowedLines - 1) break;
    }
  }

  if (currentLine) wrappedLines.push(currentLine);

  return finalizeWrappedLines(ctx, wrappedLines, maxLineWidth, maxAllowedLines);
}

/**
 * Ensures the final wrapped lines do not exceed maxAllowedLines.
 */
function finalizeWrappedLines(
  ctx: CanvasRenderingContext2D,
  wrappedLines: string[],
  maxLineWidth: number,
  maxAllowedLines: number
): string[] {
  if (wrappedLines.length > maxAllowedLines) {
    wrappedLines.length = maxAllowedLines;
  }

  // Truncate the last line if needed
  if (wrappedLines.length === maxAllowedLines) {
    wrappedLines[maxAllowedLines - 1] = truncateTextToFit(
      ctx,
      wrappedLines[maxAllowedLines - 1],
      maxLineWidth
    );
  }

  return wrappedLines.map((line) =>
    ctx.measureText(line).width > maxLineWidth
      ? truncateTextToFit(ctx, line, maxLineWidth)
      : line
  );
}

/**
 * Truncates text with an ellipsis if it exceeds maxLineWidth.
 */
function truncateTextToFit(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxLineWidth: number
): string {
  text = text.trim();
  if (!text) return ""; // Handle empty or whitespace-only input
  if (ctx.measureText(text).width <= maxLineWidth) return text; // Return early if text fits

  let left = 0,
    right = text.length;

  // binary search
  while (left < right) {
    const mid = Math.ceil((left + right) / 2);
    const truncated = text.slice(0, mid) + "…";

    if (ctx.measureText(truncated).width > maxLineWidth) {
      right = mid - 1; // Reduce size
    } else {
      left = mid; // Expand size
    }
  }

  return text.slice(0, left) + "…";
}

/**
 * Truncates a word to maxCharsPerWord with an ellipsis.
 */
function truncateWord(word: string, maxCharsPerWord: number): string {
  return word.length > maxCharsPerWord
    ? word.slice(0, maxCharsPerWord) + "…"
    : word;
}
