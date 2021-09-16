function debounce(fn, wait) {
  let timer = null;
  return function () {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}



let a = function (fn, wait) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function () {
      fn.apply(_this, args)
    }, wait)
  }
}