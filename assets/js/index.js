function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }
            renderAvatar(res.data);
        }
        
    })
}

getUserinfo();

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic == null) {
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    } else {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    }
}

$('.layui-nav-item a').on('click', function (e) {
    e.preventDefault();
    layer.confirm('确认退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something
            location.href = '/login.html';
            localStorage.removeItem('token');
        // 关闭弹出层
        layer.close(index);
    });
})