/*
* @Author: xiaofan
* @Date:   2018-03-02 20:08:59
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-02 20:15:30
*/
var _mm = require('util/mm.js');
var _cart = {
   //获取购物车数量
   getCartCount : function(resovle, reject){
       _mm.request({
        url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
        success : resovle,
        error : reject
   });
  },

}

module.exports = _cart;