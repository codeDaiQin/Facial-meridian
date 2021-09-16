const str = 'M*MSZ98B*',
  reg = /([a-z]|[0-9])/gi

let numReg = /\d/g


let newWord = 'apple is sweet',
  wordReg = /e\b/g

let email = '9591156@qq.com',
  emailReg = /([A-Za-z0-9\-\_])+\@([A-Za-z0-9\-\_])+\.([A-Za-z]{2,4})$/g
// console.log(str.replace(numReg, ''));

let href = ''

// href="[^"]*"

// console.log(newWord.replace(wordReg, ''));

console.log(emailReg.test(email), '<= 邮箱是否正常');
console.log(/@/g.exec(email).length === 1);
console.log(/\./g.exec(email).length === 1);
let a = []
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
// 如果 let 6  如果 var 10
// let 只在代码块内有效  
// var 全局范围内有效

a[6]()

// console.log(lbj);
// let lbj = '我是傻吊'
// var lbj = '我是沙雕'        let没有变量提升    var 有变量提升  


var flag = 123
if (true) {
  // TDZ开始  
  flag = 666
  // let flag    //会报错
  // TDZ结束
  // var flag    //不会报错
}

//  只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
//  ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量
//  从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
// 在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。