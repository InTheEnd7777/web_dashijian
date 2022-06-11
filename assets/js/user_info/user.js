$(function () {
  const form = layui.form;
  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '名字长度不能大于6位';
    },
  });
  const layer = layui.layer;
  const inituserinfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) return layer.msg('获取信息失败');
        layer.msg('获取信息成功');
        console.log(res);
        //填充表单
        form.val('fuzhibiaodan', res.data);
      },
    });
  };
  //重置表单
  $('#btnchongzhi').click((e) => {
    e.preventDefault();
    inituserinfo();
  });

  //更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新用户信息失败！');
        layer.msg('更新用户信息成功！');
        window.parent.getuserinfo();
        console.log(window);
    //    console.log(this);
       
      },
    });
  });
  inituserinfo();
});
