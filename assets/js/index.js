$(function() {
        // 调用用户信息函数，获取用户基本信息
        getUserinfo()
    })
    // 定义获取用户基本信息函数
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) { '获取用户基本信息失败！' }
            //   调用 渲染用户图像函数
            renderAventor(res.data)

        }
    })

}
// 定义渲染用户图像的函数
function renderAventor(user) {
    console.log(user);
    // 渲染名称
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp&nbsp' + name)
        // 判断用户有没有图片，如果有渲染用户自己的图像，如果没有渲染用户昵称的首字母
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avator').hide()

    } else {
        var first = name[0].toUpperCase()
        $('.text-avator').html(first).show()
        $('.layui-nav-img').hide()
    }


}