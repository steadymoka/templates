const path = require("path") // eslint-disable-line
const slsw = require("serverless-webpack") // eslint-disable-line
const nodeExternals = require("webpack-node-externals") // eslint-disable-line

module.exports = {
  mode: slsw.lib.options.stage === "dev" ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  externals: [
    nodeExternals(),
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  module: {
    rules: [
      { enforce: "pre", test: /\.tsx?$/, loader: "eslint-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
}
