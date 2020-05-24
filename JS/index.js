window.addEventListener("load", function () {
  var focus = document.querySelector(".focus_wrap");
  var focusImg = focus.children[0];
  var circle = focus.querySelector(".focus_circle");
  var num = 0;

  // 定时器 自动轮播
  var focusTimer = setInterval(function () {
    num++;
    focusX = -focusImg.children[0].offsetWidth * num;
    // 过渡效果
    focusImg.style.transition = "all .3s";
    focusImg.style.transform = "translateX(" + focusX + "px)";
  }, 2000);

  // 过渡完成后再判断num 监听过渡完成的事件'transitionend'
  focusImg.addEventListener("transitionend", function () {
    // num=3 说明走到最后一张图片
    num = num >= 3 ? 0 : num;
    // num=-1 说明倒着走
    num = num <= -1 ? 2 : num;
    // 清除动画
    focusImg.style.transition = "none";
    // 计算移动距离
    var focusX = -focusImg.children[0].offsetWidth * num;
    focusImg.style.transform = "translateX(" + focusX + "px)";
    // 圆圈同步变化
    circle.querySelector(".current").classList.remove("current");
    //   circle.children[num].style.transition = "all .5s ";
    circle.children[num].classList.toggle("current");
  });

  // 滑动播放图片功能
  var x = null;
  // 变量flag判断用户是否有移动
  var flag = false;
  // 手指移动距离 后面还会用到 所以声明全局变量
  var touchX = null;
  focusImg.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    // 触摸时停止定时器
    clearInterval(focusTimer);
  });
  focusImg.addEventListener("touchmove", function (e) {
    touchX = e.targetTouches[0].pageX - startX;
    // console.log(touchX);
    // 盒子移动的距离
    var focusX = -focusImg.children[0].offsetWidth * num + touchX;
    // 拖动时可以去掉过渡效果
    focusImg.style.transition = "none";
    focusImg.style.transform = "translateX(" + focusX + "px)";
    flag = true; //flag为true即为用户手指有移动
    e.preventDefault();
  });

  // 根据手指移动距离touchX来判断是否回弹
  focusImg.addEventListener("touchend", function () {
    // 如果手指移动过再做判断
    if (flag) {
      if (Math.abs(touchX) > 50) {
        // console.log(touchX);
        // 右滑 即touchX大于0时播放上一张
        if (touchX > 0) {
          num--;
        }
        // 左滑 即touchX小于0时播放上一张
        else num++;
        focusImg.style.transition = "all .3s";
        var focusX = -focusImg.children[0].offsetWidth * num;
        focusImg.style.transform = "translateX(" + focusX + "px)";
      }
      // 移动距离小于50像素 不滑动图片
      else {
        focusImg.style.transition = "all .3s";
        var focusX = -focusImg.children[0].offsetWidth * num;
        focusImg.style.transform = "translateX(" + focusX + "px)";
      }
    }
    // 手指离开时重新开启定时器
    clearInterval(focusTimer);
    focusTimer = setInterval(function () {
      num++;
      focusX = -focusImg.children[0].offsetWidth * num;
      // 过渡效果
      focusImg.style.transition = "all .6s";
      focusImg.style.transform = "translateX(" + focusX + "px)";
    }, 2000);
  });

  // 返回顶部按钮出现与隐藏
  var goBack = document.querySelector(".goback");
  var gridNav = document.querySelector(".grid-nav");
  window.addEventListener("scroll", function () {
    if (this.pageYOffset >= gridNav.offsetTop) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  });

  // 点击返回顶部
  goBack.addEventListener("click", function () {
    window.scroll(0, 0);
  });
});
