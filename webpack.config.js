const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Entry point for your application
  output: {
    filename: "index.js", // Change from bundle.js to index.js
    path: path.resolve(__dirname, "dist"), // Output directory
    libraryTarget: "commonjs2", // Ensure it's exportable as an npm package
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply the loader to TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve files from the dist directory
    },
    compress: true,
    port: 9000, // Port for the dev server
  },
};
