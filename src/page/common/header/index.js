/*
* @Author: xiaofan
* @Date:   2018-03-02 20:55:08
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-02 21:55:55
*/
require('./index.css');
var _mm = require('util/mm.js');
//通用头部搜索逻辑
var header = {
   init : function(){
        this.onLoad();
        this.bindEvent();
   },
   onLoad : function(){
      var keyword = _mm.getUrlParam('keyword');
      //keyword存在，则回调输入框
      if(keyword) {
          $('#search-input').val(keyword);
      };
   },
   bindEvent : function(){
      var _this = this;
      //点击搜索以后，做搜索提交
      $('#search-btn').click(function(){
          _this.searchSubmit();
      });
      //输入回车也要做提交 绑定到输入框上
      $('#search-input').keyup(function(e){
        //13是回车键的keyCode
          if (e.keyCode === 13) {
             _this.searchSubmit();
          }
      })
   },
   //搜索的提交
   searchSubmit : function(){
       var keyword = $.trim($('#search-input').val());
       //如果输入框有关键字，正常跳转到list页
       if (keyword) {
           window.location.href = './list.html?keyword=' + keyword;
       }else{
        //否则直接返回首页
           _mm.goHome();
       }
   }

}
header.init();