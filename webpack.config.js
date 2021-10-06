const path = require('path');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    titan: './titan.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      }, {
        test: /\.(vert|frag|comp)$/,
        use: 'raw-loader',
      }
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 9999,
  },
};
