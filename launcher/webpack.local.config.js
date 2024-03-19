/* eslint @typescript-eslint/no-var-requires: 0 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//const appBaseUrl = "http://localhost:8080/assets";
module.exports = {
  cache: false,
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json", ".css"],
  },
  devServer: {
    hot: false,
    static: path.join(__dirname, "dist"),
    historyApiFallback: {
      index: "index.html",
    },
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // Convert images to inline base64
        //type: 'asset/inline',
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets", // Indica la carpeta de destino en dist
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: "remote1@http://localhost:9002/remoteEntry.js",
        //libs: 'libs@[libsUrl]/remoteEntry.js',
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new LiveReloadPlugin(),
    new CleanWebpackPlugin(),

  ],
};
