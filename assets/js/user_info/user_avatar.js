// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview',
};

// 1.3 创建裁剪区域
$image.cropper(options);
$('#btn111').click(function () {
  $('#file').click();
});
$('#file').change(function (e) {
  console.log(e);

  const fileLen = e.target.files.length;
  if (fileLen === 0) return;
  // 1. 拿到用户选择的文件
  const file = e.target.files[0];
  // 2. 将文件，转化为路径
  const imgURL = URL.createObjectURL(file);
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});
$('#btn112').click(function () {
  // 1、拿到用户裁切之后的头像
  // 直接复制代码即可
  const dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png');
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success: function(res){
            if(res.status!==0) return layer.msg('上传失败')
            layer.msg('上传成功')
            window.parent.getuserinfo()
        }
        
    })
});
