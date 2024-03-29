$(function () {
  const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: (value) => {
      if (value === $('[name=oldPwd]').val()) return '不能与原密码相同';
    },
    rePwd: (value) => {
      if (value !== $('[name=newPwd]').val()) return '两次输入不一致';
    },
  });
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新密码失败');
        layer.msg('更新密码成功');
        //强制清空token
        localStorage.removeItem('token');
        //重新刷新页面,跳转到登录页面
        window.parent.location.href = '/login.html';
      },
    });
  });
});
