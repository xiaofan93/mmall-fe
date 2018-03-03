/*
* @Author: xiaofan
* @Date:   2018-03-03 13:04:01
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-03 13:21:00
*/

var _mm = require('util/mm.js');
require('./index.css');
require('page/common/nav-simple/index.js');

$(function(){
   var type = _mm.getUrlParam('type') || 'default';
   $element = $('.' + type + '-success').show();

   //显示对应的提示元素
   $element.show();
})
