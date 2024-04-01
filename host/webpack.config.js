const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const Dotenv = require("dotenv-webpack");
const { DateSeparatorPlugin } = require("./webpack-plugins");
const { isLocalBuild, remoteEntryUrl } = require("./webpack-env");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {resolve} = require("path");

module.exports = {
  cache: false,
  entry: "./src/index",
  mode: "development",
  devtool: isLocalBuild ? "source-map" : false,
  optimization: {
    minimize: !isLocalBuild,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json", ".css"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
  },
  output: {
    publicPath: "auto",
    clean: true,
    path: resolve(__dirname, "dist"),
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
              outputPath: "assets",
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
        remote: `remote@${remoteEntryUrl}`,
        //libs: 'libs@[libsUrl]/remoteEntry.js',
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv(),
    DateSeparatorPlugin,
    new CleanWebpackPlugin(),

  ],
};
