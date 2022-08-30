$(function(){
    // 点击切换登录注册按钮
    $('#link_reg').on('click',()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })

//自定义表单校验规则
    //layui中获得form对象
    let form = layui.form
    let layer = layui.layer
    //form.verify自定义规则
    form.verify({
        psw: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ]
        ,repwd: function(value, item){ //value：表单的值、item：表单的DOM对象
            let pws = $('.reg-box [name = password]').val()
            if(value !== pws){
              return '两次密码需一致';
            }}
    })
//用户注册事件监听提交
$('.reg-box').on('submit',(e)=>{
    //阻止表单默认行为
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/api/reguser',
        data:{
            username:$('.reg-box [name = username]').val(),
            password:$('.reg-box [name = password]').val()
        },
        success:function(res){
            if(res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功')
            //模拟点击事件，跳回登录页面
            $('#link_login').click()
        }
    })
})
//用户登录事件监听提交
$('#form_login').on('submit',(e)=>{
    //阻止表单默认行为
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/api/login',
        //快速获取表单中的数据,对象需为表单
        data:$('#form_login').serialize(),
        // data:$(this).serialize(),
        // data:{
        //     username:$('.login-box [name = username]').val(),
        //     password:$('.login-box [name = password]').val()
        // },
        success:function(res){
            if(res.status !== 0) return layer.msg(res.message)
            layer.msg('登录成功')
            //token保存到本地存储(键，值)
            localStorage.setItem('token',res.token)
            //成功后跳转至index
            location.href = '/index.html'
        }
    })
})









})

