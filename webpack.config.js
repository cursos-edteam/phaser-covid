const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js' // [name] sera main como se especifica en la entrada
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Clon T-Rex',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html' // Es el nombre del archivo de salida
    }),
    new CleanWebpackPlugin(), // Para limpiar todo el dist para que no se queda data obsoleta,
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // Imagenes
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource' // usaremos este type que ya tiene incorporado webpack para importar imagenes en el archivo por ejemplo import Imagen from 'src/imagen1'
      },
      // Fuentes o archivos svg
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline'
      },
      // SCSS y CSS
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin, 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8888
  }
};
