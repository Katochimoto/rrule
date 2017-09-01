const path = require('path');

module.exports = {
  entry: {
    rrule: './src/rrule.js',
    nlp: './src/nlp.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
