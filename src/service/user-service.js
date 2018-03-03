/*
* @Author: xiaofan
* @Date:   2018-03-02 20:00:09
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-02 20:10:14
*/
var _mm = require('util/mm.js');
var _user = {
   //用户登录
   login : function(userInfo, resolve, reject){
      _mm.request({
           url : _mm.getServerUrl('/user/login.do'),
           data : userInfo,
           method : 'post',
           success : resolve,
           error : reject
      });
   },
   //检查登录状态
   checkLogin : function(resolve, reject){
      _mm.request({
           url : _mm.getServerUrl('/user/get_user_info.do'),
           method : 'post',
           success : resolve,
           error : reject 
      });
   },

}

module.exports = _user;