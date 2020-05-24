function animate(obj, target, callback) {
  // 只有一个定时器
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    //   obj.style.left = obj.offsetLeft + 1 + "px";
    // 缓动动画 步长step 改为整数
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // obj.offsetLeft + (target - obj.offsetLeft) / 10 + "px";
    obj.style.left = obj.offsetLeft + step + "px";
    // 回调函数写在定时器结束里面
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      if (callback) {
        callback();
      }
    }
  }, 15);
}
