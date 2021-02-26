const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js||jsx$/,
  //       exclude: /(node_modules)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env', '@babel/preset-react'],
  //         },
  //       },
  //     },
  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: path.resolve(__dirname, 'client/src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/react',
                '@babel/preset-react',
                {
                  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-jsx'],
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
