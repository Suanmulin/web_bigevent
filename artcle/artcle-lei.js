$(function(){
    let layer = layui.layer
    let form = layui.form
    getliebiao()

    //获取文章分类列表
    function getliebiao(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            // url:'/my/cate/list',
            success:function(res){
                //模板引擎渲染,（渲染的模板id，数据）
               let newtr = template('tpl-table',res)
               $('tbody').html(newtr)
            }
        })
    }
    //新增文章弹窗
    let indexadd = null
    $('#art-add').on('click',function(){
        indexadd = layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加类别'
            ,content: $('#tcc-add').html()
          });   
    })
    //新增，代理绑定事件，因为初始化的时候表单不存在,父子元素
    $('body').on('submit','#art-queding',function(e){
        // console.log('xx')
        e.preventDefault()
        
        //获得全部表单数据
        let data = $('#art-queding').serialize()
        // console.log(data)
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:data,
            success:function(res){
                if(res.status !== 0)return layer.msg('新增失败' + res.message)
                layer.msg('新增成功' + res.message)
                // getliebiao()
                //根据indexadd，看关闭哪个弹窗
                layer.close(indexadd)
            }
        })
    })
    //编辑弹窗
   let indexedt = null
    $('tbody').on('click','#art-edt',function(e){
        indexedt = layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '编辑类别'
            ,content: $('#tcc-eidt').html()
          });   
        // console.log('xx')
        let id = $(this).attr('data-id')
        // console.log(id)
        e.preventDefault()
            $.ajax({
                method:'get',
                url:'/my/article/cates/' + id,
                success:function(res){
                    if(res.status !== 0) return layer.msg('获取失败'+res.message)
                    form.val('edt-ff',res.data)
                    
                }
            })
    })
    //编辑
    $('body').on('submit','#art-eidt',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate' ,
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) return layer.msg('编辑失败'+res.message)
                layer.msg('编辑成功')
                layer.close(indexedt)
                getliebiao()

            }
        })
    })
    //删除
    //点击删除，出现提示层
    // let  indexdel = null
    $('tbody').on('click','#art-del',function(e){
        let id = $(this).attr('data-id')
        indexedt = layer.open({
            title: '删除类别'
            ,content: '确定删除吗'
            ,yes: function(index, layero){
                $.ajax({
                    method:'get',
                    url:'/my/article/deletecate/' + id,
                    success:function(res){
                        if(res.status !== 0) return layer.msg('删除失败'+res.message)
                        layer.msg('删除成功')
                    }
                })
                layer.close(index); //如果设定了yes回调，需进行手工关闭
              }
          });   
    })
    








})