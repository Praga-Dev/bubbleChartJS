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

### 🎨 Example Output

Here’s an example of the bubble chart generated using this package:

![Stacked Bubble Chart Example](https://github.com/Praga-Dev/bubbleChartJS/blob/HEAD/assets/bubble-chart.png)

## Installation

You can install `bubbleChartJs` via npm:

```sh
npm install bubble-chart-js
```

## Usage

### Basic Example

```js
import BubbleChart from "bubblechartjs";

const tooltipOptions = {
  fontStyle: "italic",
  fontWeight: 800,
  textAlign: "center",
  textDecoration: "underline",
  textTransform: "uppercase",
  fontColor: "#FFF",
};

const data = [
  { label: "Biryani Battles", value: 89, bubbleColor: "#ff5733" },
  { label: "Chai vs. Coffee", value: 70, bubbleColor: "#c70039" },
  { label: "Bollywood Blockbusters", value: 90, bubbleColor: "#900c3f" },
  { label: "IPL Fever", value: 85, bubbleColor: "#ffc300" },
  { label: "Himalayan Treks", value: 65, bubbleColor: "#4caf50" },
  { label: "Diwali Firecrackers", value: 95, bubbleColor: "#ff8c00" },
  { label: "Street Food Craze", value: 75, bubbleColor: "#e91e63" },
  { label: "Fastest Century Records", value: 88, bubbleColor: "#3f51b5" },
  { label: "Royal Enfield Craze", value: 60, bubbleColor: "#795548" },
  { label: "Digital Payment Boom", value: 93, bubbleColor: "#00bcd4" },
];

const chartoptions = {
  canvasContainerId: "bubbleChart",
  data: data,
  fontSize: 14,
  maxLines: 2,
  tooltipOptions: tooltipOptions,
};

// Initialize chart
initializeChart(chartoptions);
```

## Configuration Options

The `BubbleChart` class accepts a configuration object with the following properties:

## Configuration Options

The `BubbleChart` class accepts a configuration object with the following properties:

| Property                           | Type         | Required | Optional | Description                                                         | Default     |
| ---------------------------------- | ------------ | -------- | -------- | ------------------------------------------------------------------- | ----------- |
| `canvasContainerId`                | `string`     | ✔️ Yes   | ❌ No    | The ID of the container where the chart will be rendered.           | `-`         |
| `data`                             | `DataItem[]` | ✔️ Yes   | ❌ No    | An array of objects containing `label` and `value` for each bubble. | `-`         |
| `defaultBubbleColor`               | `string`     | ❌ No    | ✔️ Yes   | Default color for bubbles if not specified in `colorMap`.           | `"#3498db"` |
| `fontSize`                         | `number`     | ❌ No    | ✔️ Yes   | Font size for bubble labels.                                        | `14`        |
| `fontFamily`                       | `string`     | ❌ No    | ✔️ Yes   | Font family for text rendering.                                     | `"Arial"`   |
| `fontColor`                        | `string`     | ❌ No    | ✔️ Yes   | Color of the text inside bubbles.                                   | `"#ffffff"` |
| `minRadius`                        | `number`     | ❌ No    | ✔️ Yes   | Minimum radius for the bubbles.                                     | `10`        |
| `maxLines`                         | `number`     | ❌ No    | ✔️ Yes   | Maximum number of lines allowed for text wrapping.                  | `3`         |
| `textWrap`                         | `boolean`    | ❌ No    | ✔️ Yes   | Enables or disables text wrapping inside bubbles.                   | `true`      |
| `isResizeCanvasOnWindowSizeChange` | `boolean`    | ❌ No    | ✔️ Yes   | Whether the chart should resize when the window size changes.       | `true`      |
| `showToolTip`                      | `boolean`    | ❌ No    | ✔️ Yes   | Whether the chart should display the tooltip or not.                | `true`      |

✔️ **Required**: These properties must be provided.
✔️ **Optional**: If not provided, the default value will be used.

## License

This project is licensed under the MIT License.

## Contributions

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ by Pragadeesh
