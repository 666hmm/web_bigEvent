$(function() {
    // 发送Ajax请求获取文章列表
    artCateList()
    var layer = layui.layer
    var form = layui.form

    function artCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染文章分类列表
                var tplhtml = template('tpl_cate', res)
                $('tbody').html(tplhtml)
            }
        })
    }
    // 给添加分类按钮绑定点击事件
    var indexadd = null;
    $('#btn_cate').on('click', function(e) {
            indexadd = layer.open({
                type: 1,
                title: '添加分类',
                content: $('#btn_addcate').html(),
                area: ['500px', '250px']
            })

        })
        // 通过代理的方式，给添加分类表单绑定提交事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) { return layer.msg('添加文章类别失败！') }
                    artCateList()
                    layer.msg('添加文章类别成功！')
                    layer.close(indexadd)
                }
            })
        })
        // // 通过代理的方式，给编辑按钮绑定单击事件
    var indexedit = null;
    $('tbody').on('click', '#form-eidt', function() {
            indexedit = layer.open({
                    type: 1,
                    title: '编辑分类',
                    content: $('#btn_addedit').html(),
                    area: ['500px', '250px']
                })
                // 给编辑按钮的弹出层填充表单数据
                // 1.获取对应行的id（设置自定义属性）
            var id = $(this).attr('data-Id')
                // 2.发Ajax请求获取对应行的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('获取文章分类信息失败！')
                    }
                    // 3.将对应行的数据填充到文章分类弹出层
                    form.val('form-edit', res.data)
                }

            })

        })
        // 通过委托的方式为编辑按钮弹出层表单绑定提交事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault()
                // 发送Ajax请求提交数据
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) { return layer.msg('修改文章类别失败！') }
                    layer.msg('更新分类数据成功！')
                    layer.close(indexedit)
                    artCateList()
                }
            })
        })
        // 为删除按钮绑定单击事件
    $('tbody').on('click', '#form-del', function() {
        var id = $(this).attr('data-Id')
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
            //发ajax请求删除文章列表
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    layer.close(index);
                    artCateList()
                }

            })


        })
    })
})