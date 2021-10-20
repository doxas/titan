const path = require('path');
const glob = require('glob');

const entryArray = glob.sync('example/**/*.ts', {
  cwd: path.resolve(__dirname, 'src'),
});
const entries = {};
entryArray.forEach((filePath) => {
  const noext = filePath.replace(/\.ts$/i, '');
  entries[noext] = `./${filePath}`;
});
entries.titan = './titan.ts';

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: entries,
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
        test: /\.(vert|frag|comp|wgsl)$/,
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
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
