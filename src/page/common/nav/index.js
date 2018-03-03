/*
* @Author: xiaofan
* @Date:   2018-03-02 18:56:08
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-02 20:16:50
*/
require('./index.css');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var _user = require('service/user-service.js');

var nav = {
  //初始化模块
   init : function() {
      this.bindEvent();
      this.loadUserInfo();
      this.loadCartCount();
      return this;
   },
   //绑定事件
   bindEvent : function(){
    //登录点击事件
      $('.js-login').click(function(){
        _mm.doLogin();
      });
      //注册点击事件
      $('.js-register').click(function(){
        window.location.href = './user-register.html';
      });
      //退出点击事件
      $('.js-logout').click(function(){
         _user.logout(function(res){
          //成功后刷新页面
            window.location.reload();
         },function(errMsg){
            _mm.errorTips(errMsg)
         });
      });

   },
   //加载用户信息
   loadUserInfo : function(){
      _user.checkLogin(function(res){
        //已经登录就隐藏登录，显示在登录状态
          $('.user.not-login').hide().siblings('.user.login').show()
          .find('.username').text(res.username);
      }, function(errMsg){
        // do nothing
      });
   },
   //加载购物车数量
   loadCartCount : function(){
      _cart.getCartCount(function(res){
         $('.nav .cart-count').text(res || 0);
      }, function(errMsg){
         $('.nav .cart-count').text(0);
      });
   }


}

module.exports = nav.init();