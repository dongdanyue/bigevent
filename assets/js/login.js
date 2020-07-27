$(function () {
    // 点击去注册账号
    $('#link_reg').on('click', function () {
        $('#login-box').hide();
        $('#reg-box').show();
    });
    // 点击去登录
    $('#link_login').on('click', function () {
        $('#reg-box').hide();
        $('#login-box').show();
    });

    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 密码的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 获取密码框中的内容
            var pwd = $('#reg-box [name=password]').val();
            // 判断两次密码是否一致
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 1.阻止表单的默认提交
        e.preventDefault();
        // 2.发起Ajax的POST请求
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            };
            layer.msg('注册成功，请登录');
            // 模拟人的点击行为
            $('#link_login').click();
        });
    });

    // 监听登录表单的提交事件
    $('#form-login').submit(function (e) {
        // 1.阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                };
                layer.msg('登录成功');
                // 将登录成功得到的 token字符串保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        });
    })
})