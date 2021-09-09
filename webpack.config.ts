import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const config = {
  mode: 'none',

  entry: ['babel-polyfill', './src/App.tsx'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: path.join(__dirname, 'src'),
      process: 'process/browser',
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },

  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8080,
    open: true,
    hot: true,
  },
};
export default config;
