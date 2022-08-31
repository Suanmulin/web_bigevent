$(function(){
    getinfo()
})

//获取用户信息
function getinfo(){
    let layer = layui.layer
    let form = layui.form
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0) return layer.msg('获取用户信息失败')
            // $('.layui-form [name = username]').attr('placeholder',res.data.username)
            // nickname = res.data.nickname|| '请输入用户昵称'
            // email = res.data.email|| '请输入用户邮箱'
            // $('.layui-form [name = nickname]').attr('placeholder',nickname)
            // $('.layui-form [name = email]').attr('placeholder',email)
            //快速给表单赋值,filter为表单的lay-filter
            form.val('filter', res.data);
        }
    })
    //点击重置按钮，重新获用户信息表单数据
    $('.layui-form').on('reset',function(){
        getinfo()
    })
    //提交修改表单
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //获得表单数据
        let data1 = form.val("filter");
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:data1,
            success:function(res){
                if(res.status !== 0) return layer.msg('修改用户信息失败')
                layer.msg('修改用户信息成功')
                //成功后需重新渲染index数据（iframe的父级是index,此时的window是iframe）
                window.parent.getUserInfo()
                
            }
        })
    })
    
}
