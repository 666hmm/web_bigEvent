$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
        // 定义获取文章列表携带的的参数
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initList()
        // 定义初始化文章列表方法
    function initList() {
        // 发ajax请求获取文章列表
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) { return layer.msg('获取文章列表失败！') }
                var tplstr = template('tpl-list', res)
                $('tbody').html(tplstr)
                renderPagenum(res.total)
            }
        })

    }
    // 定义时间过滤器
    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date)
            var y = dt.getFullYear()
            var m = addzero(dt.getMonth() + 1)
            var d = addzero(dt.getDate())

            var hh = addzero(dt.getHours())
            var mm = addzero(dt.getMinutes())
            var ss = addzero(dt.getSeconds())
            return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
        }
        // 定义一个补零函数
    function addzero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义获取文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败！')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name="分类"]').html(htmlStr)
                form.render()

            }
        })
    }
    // 为查询区域绑定提交事件
    $('#cate_query').on('submit', function(e) {
            e.preventDefault()
            var q_cate = $['name="分类"'].val()
            var q_state = $['name = "状态"'].val()
            q.cate_id = q_cate
            q.state = q_state
            initList()

        })
        // 定义渲染分页的方法
    function renderPagenum(total) {
        // 调用layui的laypage.render方法生成分页布局
        laypage.render({
            elem: 'pageNum',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum
        })

    }
    // 给删除按钮绑定点击事件

    $('tbody').on('click', '#btn-delete', function() {
        var id = $(this).attr('data-Id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) { return layer.msg('删除文章列表失败！') }
                    layer.msg('删除文章列表成功！')
                    initList()
                }
            })
            layer.close(index);
        });
    })
})