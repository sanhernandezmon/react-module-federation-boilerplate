/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require("fs");
const { join, resolve } = require("path");
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ModuleFederationPlugin } = require("webpack").container;
//const appBaseUrl = "http://localhost:8080";
const Dotenv = require('dotenv-webpack');

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

 Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

 This source code is licensed under the ${license} license found in the LICENSE file in the root directory of this source tree.`;

// common
const common = {
  cache: false,
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
    // new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    //new BundleAnalyzerPlugin(),
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: "remote1@http://172.18.64.1:8081/remoteEntry.js",
        //libs: 'libs@[libsUrl]/remoteEntry.js',
      },
    }),
    new Dotenv()

  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // parallel: true, // Multi-threading
        extractComments: false,
      }),
    ],
  },
};

// config
module.exports = [
  {
    output: {
      path: resolve(__dirname, "dist-lib"),
      filename: "[name].common.js",
      library: {
        type: "commonjs",
      },
    },
    ...common,
  },
  {
    output: {
      path: resolve(__dirname, "dist-lib"),
      filename: "[name].umd.js",
      libraryTarget: "umd",
    },
    ...common,
  },
  {
    experiments: {
      outputModule: true,
    },
    output: {
      path: resolve(__dirname, "dist-lib"),
      filename: "[name].esm.js",
      libraryTarget: "module",
    },
    ...common,
  },
  {
    output: {
      path: resolve(__dirname, "dist-lib"),
      filename: "[name].min.js",
    },
    ...common,
  },
];
