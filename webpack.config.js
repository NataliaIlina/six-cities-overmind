const path = require(`path`);
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseUrl = '/six-cities-overmind';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      name: 'all',
    },
  };

  if (isProd) {
    config.minimize = true;
    config.minimizer = [new TerserWebpackPlugin(), new OptimizeCssAssetsPlugin()];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: `./index.tsx`,
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, `dist`),
    publicPath: isDev ? '' : baseUrl,
  },
  devServer: {
    contentBase: path.resolve(__dirname, `dist`),
    compress: false,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './assets/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyPlugin([{ from: './assets/img', to: path.resolve(__dirname, `dist/img`) }]),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [`babel-loader`],
      },
      {
        test: /\.(tsx|ts)?$/,
        use: [`ts-loader`],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: isDev ? '' : '/six-cities-overmind/',
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          publicPath: isDev ? '' : '/six-cities-overmind/',
        },
      },
    ],
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, `src/pages`),
      components: path.resolve(__dirname, `src/components`),
      src: path.resolve(__dirname, `src/`),
    },
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`],
  },
  optimization: optimization(),
  devtool: isDev ? `source-map` : '',
};
