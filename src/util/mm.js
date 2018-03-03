/*
* @Author: xiaofan
* @Date:   2018-03-02 11:29:09
* @Last Modified by:   xiaofan
* @Last Modified time: 2018-03-02 14:21:21
*/

var Hogan = require('hogan');
var conf = {
    getServerUrl : ''
};

var _mm = {
      // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path) {
        return  conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam : function(name) {
        //http://localhost:8088/dist/view/index.html?test=123
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //window.location.search表示问号之后的参数
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        result = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg) {
        alert(msg || '操作成功');
    },
    //失败提示
    errorTips : function(msg) {
        alert(msg || '亲，哪里不对了~');
    },
    //字段的验证，支持非空，手机号，邮箱的判断
    validate : function(value, type) {
        //非空判断
        var value = $.trim(value);
        if ('require' === type) {
            //把字符串强转成Boolean类型
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },

    // 统一登录处理  登录结束跳转回当前页面
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function() {
        window.location.href = './index.html';
    }

 };  

module.exports = _mm;