$(function(){
        let layer = layui.layer
    //裁剪js
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)

 //上传
 $('#shangchuan').on('click',function(){
    $('#file').click()
 })

//更改预览图片,监听文件change事件
$('#file').on('change',function(e){
    //获取上传的文件
    let newAvt = e.target.files[0]
    //据选择的文件，创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(newAvt)
    $('#image')
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)   //创建裁剪区域
})
//上传头像
$('#queding').on('click',function(){
    let dataURL = $('#image')
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      $.ajax({
        method:'post',
        data:{
            "avatar":dataURL
        },
        url:'/my/update/avatar',
        success:function(res){
            if(res.status !== 0) layer.msg('更新失败' + res.message)
            layer.msg(res.message)
            //更新主页头像
            window.parent.getUserInfo()
        }
      })
})

})






// function getinfo (){
//     let layer = layui.layer
//     let form = layui.form
//     $.ajax({
//         method:'get',
//         url:'/my/userinfo',
//         success:function(res){
//             if(res.status !== 0) return layer.msg('获取用户信息失败')
//             // $('#image').attr('src',res.data)
//             console.log(res.data['email'])
//         }
//     })
// }