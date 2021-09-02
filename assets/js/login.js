$(function() {
    // 给“去注册账号”链接绑定点击事件
    $('#regup').on('click', function() {
        $('.login').hide()
        $('.regup').show()

    })

    // 给"去登录"链接绑定点击事件
    $('#login').on('click', function() {
            $('.login').show()
            $('.regup').hide()
        })
        // 自定义校验规则
        // 从layui上获取form对象
    var form = layui.form
    var layer = layui.layer


    // 自定义密码为6~12位
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            var pwd = $('.regup [name=pwd]').val()
            if (pwd !== value) {
                return layer.msg('两次密码不一致！')
                    // return '两次密码不一致，请重新输入！'
            };
            // layer.msg('两次密码一致，请登录！');
        }
    });
    // 监听注册表单的提交事件
    $('#form_regup').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
                username: $('#form_regup [name=username]').val(),
                password: $('#form_regup [name=pwd]').val()
            }, function(res) {
                if (res.status !== 0) { return console.log(res.message); }
                layer.msg('注册成功，请登录 ！');
            })
            // 跳转到登录页面
        $('#login').click()

    });
    // 监听登录表单提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登录成功！')
                location.href = '/index.html'
            }
        })
    })
})