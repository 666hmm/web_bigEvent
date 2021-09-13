$(function() {
    var layer = layui.layer
    var form = layui.form
    initCate()
        // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) { return layer.msg('获取文章类别失败！') }
                var htmlstr = template('tpl-cate', res)
                $('[name="cate_id"]').html(htmlstr)
                form.render()
            }

        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 给选择封面按钮绑定点击事件
    $('#btn-select').on('click', function() {
            $('#coverfile').click()
        })
        // 给文件选择按钮绑定change事件
    $('#coverfile').on('change', function(e) {
            var file = e.target.files[0]
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 准备发布文章所需要的数据
    var art_state = "已发布"
    $('#btn-caogao').on('click', function() {
            art_state = "草稿"
        })
        // 为表单绑定提交事件
    $('#form-publish').on('submit', function(e) {
        //   1.阻止表单默认提交行为
        e.preventDefault()
            // 2.基于form表单，快速创建FormData对象
        var fd = new FormData($(this)[0])
            // 3.将文章的发布状态追加到fd中
        fd.append('state', art_state)
            // 4.将封面裁剪区域输出为一个文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，将文件追加到fd中
                fd.append('cover_img', blob)
                    //     // 循环打印fd
                    // fd.forEach(function(v, k) {
                    //     console.log(k, v);
                    //     })
                    // 调用发表文章函数，发送Ajax请求
                articlePub(fd)
            })
    })

    function articlePub(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) { return layer.msg('发表文章失败！') }
                layer.msg('发表文章成功！')
                location.href = "/article/article_list.html"

            }

        })

    }

})