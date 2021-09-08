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
 $('#pic_update').click(function() {
     $('#file_box').click()
 })
 var layer = layui.layer
     //  为文件绑定change事件
 $('#file_box').on('change', function(e) {
     var filelist = e.target.files
         // 判断用户有没有选择文件，没有选择提示用户选择，选择了更换图片
     if (filelist.length === 0) { return layer.msg('请选择图片') }

     var file = e.target.files[0]
     var newImgURL = URL.createObjectURL(file)
     $image
         .cropper('destroy') // 销毁旧的裁剪区域
         .attr('src', newImgURL) // 重新设置图片路径
         .cropper(options) // 重新初始化裁剪区域
 })
 $('#pic_confirm').on('click', function(e) {
     //  拿到裁剪区域图片
     var dataURL = $image
         .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
             width: 100,
             height: 100
         })
         .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
         // 发送ajax请求，将裁剪区域图片上传到服务器
     $.ajax({
             method: 'POST',
             url: '/my/update/avatar',
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.status !== 0) { return layer.msg('上传图片失败！') }
                 layer.msg('上传图片成功！')
             }

         })
         // 调用函数重新渲染用户信息
     window.parent.renderAventor()
 })