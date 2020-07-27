// 每次调用$.get()或$.post()或$.ajax()的时候都会先调用这个函数
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})