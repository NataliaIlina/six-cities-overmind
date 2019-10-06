const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 8080,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, `src/components/`),
      reducer: path.resolve(__dirname, `src/reducer`),
      hocs: path.resolve(__dirname, `src/hocs`),
      src: path.resolve(__dirname, `src/`)
    },
    extensions: [`.js`, `.jsx`]
  },
  devtool: `source-map`
};
