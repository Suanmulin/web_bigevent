$(function(){
    //自定义表单校验规则
    let form = layui.form
    let layer = layui.layer
    //form.verify自定义规则
    form.verify({
        psw: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ]
        ,repsw: function(value, item){ //value：表单的值、item：表单的DOM对象
            let pws = $('.layui-form [name = newPwd]').val()
            if(value !== pws){
              return '两次密码需一致';
            }}
        //新密码不可与原密码一致
        ,repsw2:function(value, item){ //value：表单的值、item：表单的DOM对象
            let pws = $('.layui-form [name = oldPwd]').val()
            if(value === pws){
              return '新旧密码不可一致';
            }}
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //获取表单数据
        let data1 = form.val("filter");
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:data1,
            success:function(res){
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('修改成功')
                localStorage.removeItem('token')
                //触发推出事件
                window.parent.location.href='/login.html'
            }
        })
    })
})