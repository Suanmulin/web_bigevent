//每次调接口之前，会先调用函数ajaxPrefilter
//依赖于jq
$.ajaxPrefilter((options)=>{
    options.url = 'http://www.liulongbin.top:3007' + options.url
})