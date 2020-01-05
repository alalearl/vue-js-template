const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const environment =
  process.env.NODE_ENV === 'development'
    ? require('./config/env/env.dev')
    : require('./config/env/env.prod');

module.exports = {
  mode: 'development',
  entry: {
    polyfill: '@babel/polyfill',
    main: path.join(__dirname, 'src/main.js'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$:
        process.env.NODE_ENV === 'development'
          ? 'vue/dist/vue.runtime.js'
          : 'vue/dist/vue.runtime.min.js',
      '@': path.join(__dirname, 'src'),
    },
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8080,
    stats: {
      normal: true,
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: 'public/index.html',
      chunksSortMode: 'dependency',
    }),
    new webpack.EnvironmentPlugin(environment),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.EnvironmentPlugin(environment),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'vue-style-loader'
            : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: process.env.NODE_ENV === 'development' },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'vue-style-loader'
            : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: process.env.NODE_ENV === 'development' },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: process.env.NODE_ENV === 'development' },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: './src/styles/_global.scss',
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'vue-style-loader'
            : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: process.env.NODE_ENV === 'development' },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: process.env.NODE_ENV === 'development' },
          },
        ],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: !process.env.NODE_ENV === 'production',
      }),
    ],
  },
};
