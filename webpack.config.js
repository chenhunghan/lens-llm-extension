const path = require("path");

module.exports = [
  {
    entry: "./main.ts",
    context: __dirname,
    target: "electron-main",
    module: {
      rules: [{
        test: /\.(tsx|jsx|ts|js)?$/,
        loader: "swc-loader",
      }],
    },
    externals: [
      {
        "@k8slens/extensions": "var global.LensExtensions",
        mobx: "var global.Mobx",
        react: "var global.React",
      },
    ],
    resolve: {
      extensions: [".ts", ".js"],
      mainFields: ["main"],
    },
    output: {
      libraryTarget: "commonjs2",
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    experiments: {
      asyncWebAssembly: true,
      layers: true
    },
  },
  {
    entry: "./renderer.tsx",
    context: __dirname,
    target: "electron-renderer",
    module: {
      rules: [
        {
          test: /\.(tsx|jsx|ts|js)?$/,
          loader: "swc-loader",
        }
      ],
    },
    externals: [
      {
        "@k8slens/extensions": "var global.LensExtensions",
        react: "var global.React",
        mobx: "var global.Mobx",
        "react-dom": "var global.ReactDOM",
        "mobx-react": "var global.MobxReact",
      },
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      aliasFields: [],
    },
    output: {
      libraryTarget: "commonjs2",
      globalObject: "this",
      filename: "renderer.js",
      path: path.resolve(__dirname, "dist"),
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    experiments: {
      asyncWebAssembly: true,
      layers: true
    },
  },
];
