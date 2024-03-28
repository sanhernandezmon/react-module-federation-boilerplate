/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

/*const plugins = function () {
  return [
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: "./",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**!/index.html"],
          },
        },
      ],
    }),
  ];
};

const common_config = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // Convert images to inline base64
        //type: "asset/inline",
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
};

const dev_config = {
  ...common_config,
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Webpack React Typescript Library Template",
      template: "public/index.html",
    }),
    ...plugins(),
  ],
};

const prod_config = {
  ...common_config,
  mode: "production",
  output: {
    publicPath: "./",
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Webpack React Typescript Library Template",
      template: "public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: "remote1@http://172.18.64.1:8081/remoteEntry.js",
        //libs: 'libs@[libsUrl]/remoteEntry.js',
      },
    }),
    ...plugins(),
    new CleanWebpackPlugin(),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    return dev_config;
  }

  if (argv.mode === "production") {
    return prod_config;
  }
};*/

module.exports = {
  entry:  path.resolve(__dirname, './src/bootstrap.tsx'),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
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
  mode: "production",
  output: {
    path: path.resolve(__dirname, './dist'),
    clean: true,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Host Spa",
      template: path.resolve(__dirname, './public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: "remote1@http://172.18.64.1:8081/remoteEntry.js",
        //libs: 'libs@[libsUrl]/remoteEntry.js',
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/",
          to: "./",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new (function () {
      this.apply = (compiler) => {
        compiler.hooks.done.tap("Log On Done Plugin", () => {
          console.log("\n======================== [" + new Date().toLocaleString() + "]" + " Begin a new compilation. ========================\n ");
        });
      };
    })(),
  ],
};

