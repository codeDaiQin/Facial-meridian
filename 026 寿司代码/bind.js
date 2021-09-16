// 手写bind

Function.prototype.myBind = function (thisarg, ...list) {
  let _this = this
  return () => _this.apply(thisarg, [...list])
}

let arr = [[[8]]]


console.log(arr.flat(Infinity))