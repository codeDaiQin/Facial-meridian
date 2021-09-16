let obj = {
  x: 1,
  y: 0,
  z: {
    a: 1,
    b: 2,
    c: 3
  }
}


let obj1 = obj
console.log(obj1 === obj);


let obj2 = JSON.parse(JSON.stringify(obj))
console.log(obj2 === obj);

// 一. json方法
// 1. 适合情况：
//  JSON对象的深度克隆。方法是先JSON.stringify() 转为json字符串， 再JSON.parse() 转为json数组

// 2. 缺点：
//   a. 如果你的对象里有函数, 函数无法被拷贝下来
//   b. 无法拷贝copyObj对象原型链上的属性和方法