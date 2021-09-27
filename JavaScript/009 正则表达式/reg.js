let str = '0000@qq.com'

let reg = /@/i


let r = ["qq.com", "163.com", "vip.163.com", "263.net", "yeah.net", "sohu.com", "sina.cn", "sina.com", "eyou.com", "gmail.com", "hotmail.com"];
r = r.join('||')
console.log(r);


var myemail = str
var myReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5]{4,11})+\@(qq.com||163.com||vip.163.com||263.net||yeah.net||sohu.com||sina.cn||sina.com||eyou.com||gmail.com||hotmail.com)$/;
// let myReg = /^\w+@[a-zA-Z0-9]{4,10}(?:\.[a-z]{2,4}){1,3}$/;
if (myReg.test(myemail)) {
  console.log(true);
} else {
  console.log(false);
}