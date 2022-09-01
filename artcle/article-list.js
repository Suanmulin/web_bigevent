$(function(){
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage;
    //定义请求数据
    let q ={
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    getlist()
    //获取列表数据
    function getlist(){
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !== 0 )return layer.msg('请求失败' + res.message)
                //模板引擎渲染,（渲染的模板id，数据）
               let newtr = template('tpl-table',res)
               $('tbody').html(newtr)
               console.log('获取列表数据成功')
               getfenye(50)//res.total
            }
        })
    }
    //筛选
    //获取文章分类
    getcase()
    function getcase(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0 )return layer.msg('获取分类失败' + res.message)
                //模板引擎渲染,（渲染的模板id，数据）
               let newtr = template('tpl-select',res)
            //    console.log(newtr)
               $('[name = cate_id]').html(newtr)
            //重新渲染
            form.render()
               
            }
        })
    }
    //文章筛选按钮
    $('#shaixuan').on('click',function(e){
        e.preventDefault()
        q.cate_id = $('[name = cate_id]').val()
        q.state = $('[name = state]').val()
        // console.log(q)
        getlist()
    })
    
//分页
function getfenye(total){
    laypage.render({
        elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
        ,count: total //数据总数，从服务端得到
        ,limit:2//每条显示条数q.pagesize
        ,curr:1//起使页q.pagenum
        //分页数据切换
        ,layout:['prev','limit', 'page', 'next','skip']
        ,jump: function(obj, first){
            q.pagenum = obj.curr
            //首次不执行
            if(!first){
            getlist()
            }
            
          }
      });
}






})