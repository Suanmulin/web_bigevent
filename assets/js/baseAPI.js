//每次调接口之前，会先调用函数ajaxPrefilter
//依赖于jq
$.ajaxPrefilter((options)=>{
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //为有权限的请求加headers,indexOf如果没有找到匹配的字符串则返回 -1。

    if(options.url.indexOf('/my/' !== -1)){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res){
            //res.responseJSON服务器响应回来的数据
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                localStorage.removeItem('token')
                location.href='/login.html'
            }
        }

})