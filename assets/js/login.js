$(function () {
    $('.go-reg a').on('click', function () {
        $('.regbox').show();
        $('.loginbox').hide();
    })
    $('.go-login a').on('click', function () {
        $('.regbox').hide();
        $('.loginbox').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,16}$/, '密码必须输入6-12位，且不包括空格'],
        repwd: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                return '两次密码输入不一致，请重新输入';
            }
        }
    })

    // 监听注册用户发起Ajax请求
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()

        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('账号注册失败')
            }
            layer.msg('账号注册成功，请登录');
            $('.go-login a').click();
        })
    })

    // 发起登录的Ajax请求
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method:'post',
            url: '/api/login',
            data: $('#form-login').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }

        })
    })
})