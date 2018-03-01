/*
* @Author: xiaofan
* @Date:   2018-02-28 15:19:12
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-01 10:37:41
*/

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//配置环境变量 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取Html-Webpack-Plugin插件参数
var getHtmlConfig = function(name) {
   return {
            template  : './src/view/'+ name +'.html',
            filename  : 'view/'+ name +'.html',
            inject    : true,
            hash      : true,
            chunks    : ['common',name]
   }
}
var config = {
   entry: {
      'common': ['./src/page/common/index.js'],
      'index' : ['./src/page/index/index.js'],
      'login' : ['./src/page/login/login.js']
   },
   output: {
      path: './dist',
      publicPath: '/dist',
      filename: 'js/[name].js'
   },
   externals : {
      'jquery' : 'window.jQuery'
   },
   module : {
      loaders : [
         { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},

         { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
      ]
   },
   plugins : [
      //独立通用模块到js/base.js
       new webpack.optimize.CommonsChunkPlugin({
           name : 'common',
           filename : 'js/base.js'
       }),
       //把css单独打包到文件里
       new ExtractTextPlugin("css/[name].css"),
       //html模板处理
       new HtmlWebpackPlugin(getHtmlConfig('index')),
       new HtmlWebpackPlugin(getHtmlConfig('login'))
   ]

};

//避免在打包webpack-dev-server打包进线上环境
if ('dev' === WEBPACK_ENV) {
   config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;