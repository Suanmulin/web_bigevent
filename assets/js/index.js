$(function(){
    getUserInfo()
    //退出
    $('#tuichu').on('click',()=>{
        layui.layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //确定
            //清空token，返回login页面
            localStorage.removeItem('token')
            location.href='/login.html'
            //取消,关闭该询问框的弹出层
            layui.layer.close(index);
          });
    })

})

//获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },baseAPI.js中定义了
        success:function(res){
            if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
            //修改用户头像
            renderAv(res.data)
        },
        //无论成功或失败都会回调complete..baseapi里统一添加
        // complete:function(res){
        //     console.log(res)
        //     //res.responseJSON服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        // }
    })
}

//渲染用户头像
function renderAv(user){
    let name = user.nickname || user.username
    //欢迎文本
    $('#welcome').html(`欢迎  ${name}`)
    //渲染头像
    if(user.user_pic !== null){
        $('.text-av').hide()
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        let avg = name[0].toUpperCase()
        $('.text-av').html(avg)
    }
}

