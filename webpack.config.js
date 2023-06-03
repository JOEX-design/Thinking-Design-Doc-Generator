const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  return ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
      ui: './src/ui/ui.tsx',
      code: './src/code.ts',
      doc: './src/docs/index.tsx'
    },

    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist')
      },
      open: ['/plugin-ui.html'],
      hot: true,
      compress: true,
      historyApiFallback: true,
      port: 9020,
    },


    module: {
      rules: [
        // Converts TypeScript code to JavaScript
        // { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: env.PREVIEW_ENV === 'browser' ? [ReactRefreshTypeScript()] : [],
                }),
              }
            }
          ].filter(Boolean),
        },

        // Enables including CSS by doing "import './file.css'" in your TypeScript code
        { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },

        // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
        { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
      ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist",
      publicPath: ''
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
      env.PREVIEW_ENV === 'browser' && new ReactRefreshPlugin(),
      env.PREVIEW_ENV === 'browser' && new ForkTsCheckerWebpackPlugin(),

      new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/ui/ui.html',
        filename: 'plugin-ui.html',
        chunks: ['ui'],
        cache: false
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/docs/index.html',
        filename: 'index.html',
        chunks: ['doc'],
        cache: false
      }),
      // argv.PREVIEW_ENV !== 'browser' && new HtmlWebpackInlineSourcePlugin(),
      env.PREVIEW_ENV !== 'browser' && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
      env.PREVIEW_ENV !== 'browser' && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/doc/]),
      new webpack.DefinePlugin({
        'process.env': {
          PREVIEW_ENV: JSON.stringify(env.PREVIEW_ENV)
        },
      }),
    ].filter(Boolean),
  });
};