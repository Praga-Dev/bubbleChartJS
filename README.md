# bubbleChartJs

bubbleChartJs is a lightweight and customizable JavaScript library for creating stacked bubble charts, arranging bubbles by size with the largest at the top.

### ✨ Why Use a Stacked Bubble Chart?

Multi-Dimensional Data Representation – Visualizes multiple datasets at once.

Better Group Comparisons – Highlights relationships between different categories.

Enhanced Readability – Shows data trends with layered or clustered bubbles.

Customizable & Interactive – Allows tooltips.

### 🔧 Features

✔️ Supports stacked or grouped bubble layouts

✔️ Customizable bubble color

✔️ Fully compatible with JavaScript & Typescript

✔️ Interactive tooltips and hover effects

### 📌 Use Cases

Financial Analysis – Display investment risks vs. returns for multiple assets.

Social Media Metrics – Visualize engagement levels across platforms.

Scientific Research – Show relationships in grouped experimental data.

## Installation

You can install `bubbleChartJs` via npm:

```sh
npm install bubble-chart-js
```

## Usage

### Basic Example

```js
import BubbleChart from "bubblechartjs";

const config = {
  canvasContainerId: "bubbleChartCanvas",
  data: [
    { label: "A", value: 100 },
    { label: "B", value: 80 },
    { label: "C", value: 60 },
  ],
  colorMap: {
    A: "#ff5733",
    B: "#33ff57",
    C: "#3357ff",
  },
  defaultBubbleColor: "#cccccc",
  fontSize: 14,
  fontFamily: "Arial",
  fontColor: "#000000",
  minRadius: 10,
  maxLines: 2,
  textWrap: true,
  isResizeCanvasOnWindowSizeChange: true,
};

initializeChart(config);
```

## Configuration Options

The `BubbleChart` class accepts a configuration object with the following properties:

## Configuration Options

The `BubbleChart` class accepts a configuration object with the following properties:

| Property                           | Type                     | Required | Optional | Description                                                         | Default     |
| ---------------------------------- | ------------------------ | -------- | -------- | ------------------------------------------------------------------- | ----------- |
| `canvasContainerId`                | `string`                 | ✔️ Yes   | ❌ No    | The ID of the container where the chart will be rendered.           | `-`         |
| `data`                             | `DataItem[]`             | ✔️ Yes   | ❌ No    | An array of objects containing `label` and `value` for each bubble. | `-`         |
| `colorMap`                         | `Record<string, string>` | ❌ No    | ✔️ Yes   | A mapping of labels to specific bubble colors.                      | `{}`        |
| `defaultBubbleColor`               | `string`                 | ❌ No    | ✔️ Yes   | Default color for bubbles if not specified in `colorMap`.           | `"#3498db"` |
| `fontSize`                         | `number`                 | ❌ No    | ✔️ Yes   | Font size for bubble labels.                                        | `14`        |
| `fontFamily`                       | `string`                 | ❌ No    | ✔️ Yes   | Font family for text rendering.                                     | `"Arial"`   |
| `fontColor`                        | `string`                 | ❌ No    | ✔️ Yes   | Color of the text inside bubbles.                                   | `"#ffffff"` |
| `minRadius`                        | `number`                 | ❌ No    | ✔️ Yes   | Minimum radius for the bubbles.                                     | `10`        |
| `maxLines`                         | `number`                 | ❌ No    | ✔️ Yes   | Maximum number of lines allowed for text wrapping.                  | `3`         |
| `textWrap`                         | `boolean`                | ❌ No    | ✔️ Yes   | Enables or disables text wrapping inside bubbles.                   | `true`      |
| `isResizeCanvasOnWindowSizeChange` | `boolean`                | ❌ No    | ✔️ Yes   | Whether the chart should resize when the window size changes.       | `true`      |
| `showToolTip`                      | `boolean`                | ❌ No    | ✔️ Yes   | Whether the chart should display the tooltip or not.                | `true`      |

✔️ **Required**: These properties must be provided.
✔️ **Optional**: If not provided, the default value will be used.

## License

This project is licensed under the MIT License.

## Contributions

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ by Pragadeeshwaran
