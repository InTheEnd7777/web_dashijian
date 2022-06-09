function getuserinfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',

    success: function (res) {
      renderAvatar(res.data);
    },
  });
}
const renderAvatar = (user) => {
  const name = user.username || user.nickname;
  //渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`);
  //按需渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
};
$('#tuichubtn').click(function () {
  layui.layer.confirm(
    '确定退出登录？',
    { icon: 3, title: '' },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token');
      // 重新跳转到登录页面
      location.href = '/login.html';
    }
  );
});
getuserinfo();
