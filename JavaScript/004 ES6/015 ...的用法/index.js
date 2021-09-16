



let sum = (...nums) => {
  let sum = 0
  for (let i of nums) {
    sum += i
  }
  return sum
}


console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))





const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


let myPromise = (fn) => {
  let _this = this
  this.state = PENDING
  this.value = undefined
  this.reason = undefined

  // 成功
  revolse = (value) => {

  }

  // 失败
  reject = (reason) => {

  }

  fn(revolse, reject)

  // .then 回调
  myPromise.prototype.then = (onFulfilled, onRejected) => {
    console.log(onFulfilled, onRejected);
  }
}



Array.prototype.chua = () => {
  console.log(this, 112233);
}

let arr1 = [1, 2, 3, 4]

arr1.chua()