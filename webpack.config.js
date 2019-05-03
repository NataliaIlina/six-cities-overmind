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
    open: true
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
      src: path.resolve(__dirname, `src/`),
      components: path.resolve(__dirname, `src/components/`)
    },
    extensions: [`.js`, `.jsx`]
  },
  devtool: `source-map`
};
