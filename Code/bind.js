// 手写bind

Function.prototype.myBind = function (thisarg, ...list) {
  return () => this.apply(thisarg, [...list])
}

let arr = [[[8]]]


console.log(arr.flat(Infinity))