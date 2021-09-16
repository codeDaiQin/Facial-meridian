## JS类型

1. 基本类型
2. 引用类型

### 类型判断方法

1. typeof运算符
  用来判断基本类型和函数

  ```js
    console.log(typeof 1)      			// number
    console.log(typeof 'a')				// string
    console.log(typeof true)			// boolean
    console.log(typeof Symbol('a'))		// symbol
    console.log(typeof 100n)			// bigint
    console.log(typeof undefined)		// undefined
    console.log(typeof null)			// object
    // 除此之外还能识别函数
    console.log(typeof function(){})        // function
  ```
2. 


https://blog.csdn.net/weixin_41957432/article/details/110087574