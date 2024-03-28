const fs = require("fs");
const { join, resolve } = require("path");
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ModuleFederationPlugin } = require('webpack').container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getPackageJson = function (...args) {
  const packageJSON = JSON.parse(fs.readFileSync(join(__dirname, "./package.json")));
  if (!args.length) {
    return packageJSON;
  }
  return args.reduce((out, key) => {
    out[key] = packageJSON[key];
    return out;
  }, {});
};

const {
  name: pkgName,
  version,
  description,
  license,
  author,
  repository,
  homepage,
} = getPackageJson("name", "version", "description", "license", "author", "repository", "homepage");

const banner = ` Name: ${pkgName}
 Version: ${version}
 Description: ${description}
 Author: ${author}
 Homepage: ${homepage}
 Repository: ${repository.url}

 Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

 This source code is licensed under the ${license} license found in the LICENSE file in the root directory of this source tree.`;

// common
module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
 // externals: ["react"],
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json", ".css"],
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
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // Convert images to inline base64
        //type: 'asset/inline'
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
  output: {
    path: resolve(__dirname, "dist-mfe")
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    //new BundleAnalyzerPlugin(),
    new ModuleFederationPlugin({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      }
    }),
    new CleanWebpackPlugin(),

  ],
/*  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // parallel: true, // Multi-threading
        extractComments: false,
      }),
    ],
    splitChunks: false,
  },*/
};
