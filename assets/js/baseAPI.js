$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})
if (options.url.indexOF('/my/') !== -1) {
    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }
    options.complete = function(res) {
        if (res.responseJASON.status === 1 && res.responseJASON.msg === '身份认证失败！') {
            localStorage.moveItem('token')
            location.href = '/login.html'
        }
    }
}