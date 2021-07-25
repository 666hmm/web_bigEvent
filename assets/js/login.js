$(function() {
    // 点击去注册跳转到注册页面
    $("#goRegup").on('click', function() {
            $('.login').hide()
            $('.gologin').show()


        })
        // 点击登录跳转到登录页面
    $("#goLogin").on('click', function() {
        $('.login').show()
        $('.gologin').hide()
        console.log(ok);

    })
})