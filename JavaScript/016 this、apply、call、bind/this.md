# this、apply、call、bind

## 1. this的指向

  __this 永远指向最后调用它的那个对象__

  例1：
  ```js
    let name = "windowsName";
    function a() {
        let name = "Cherry";

        console.log(this.name);          // windowsName

        console.log("inner:" + this);    // inner: Window
    }
    a();
    console.log("outer:" + this)         // outer: Window   
  ```
  最后调用 `a` 的地方 `a()`;，前面没有调用的对象那么就是全局对象 window，这就相当于是` window.a()`。

  例2：
  ```js
    let name = "windowsName";
    let a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    a.fn();
  ```
  在这个例子中，函数 fn 是对象 a 调用的，所以打印的值就是 a 中的 name 的值。

  例3：
  ```js
    let name = "windowsName";
    let a = {
        name : null,
        // name: "Cherry",
        fn : function () {
            console.log(this.name);      // windowsName
        }
    }

    let f = a.fn;
    f();
  ```
  因为虽然将 a 对象的 fn 方法赋值给变量 f 了，但是没有调用，“this 永远指向最后调用它的那个对象”，由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。

## 2. 改变this指向
### 箭头函数


  __由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，__
  箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。

  #### 箭头函数的特点
  * 箭头函数是匿名函数
  * 箭头函数的this指向外层作用域的this的值
  * 箭头函数不绑定argument是，而用剩余参数…rest解决
  * 箭头函数不能用作构造函数
  * 箭头函数没有原型属性*

  例4：
  ```js
    let name = "windowsName";

    let a = {
        name : "Cherry",

        func1: function () {
            console.log(this.name)     
        },

        func2: function () {
            setTimeout( () => {
                this.func1()
            },100);
        }
    };

    a.func2()     // Cherry
  ```
### 在函数内部使用 __`_this = this`__
  我们是先将调用这个函数的对象保存在变量 `_this` 中，然后在函数中都使用这个 `_this`，这样 `_this` 就不会改变了。
  
  例5：
  ```js
    let name = "windowsName";
    let a = {
        name : "Cherry",
        func1: function () {
            console.log(this.name)     
        },
        func2: function () {
            let _this = this;
            setTimeout( function() {  
                // setTimeout 的对象是 window 如果this会报错
                _this.func1()
            },100);
        }
    };

    a.func2()       // Cherry
  ```
  在 func2 中，首先设置 `let _this = this`，这里的 this 是调用 `func2` 的对象 a，为了防止在 `func2` 中的 __setTimeout__ 被 __window__ 调用而导致的在 __setTimeout__ 中的 this 为 __window__。我们将 `this(指向变量 a)` 赋值给一个变量 `_this`，这样，在 `func2` 中我们使用 `_this` 就是指向对象 a 了。
### 使用 apply、call、bind
  __调用`call`/`apply`/`bind`的必须是个函数__
#### apply
  > apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。

  语法：

  > fun.apply(thisArg, [argsArray])
  
  * thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
  
  * argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。
#### call
  其实 apply 和 call 基本类似，他们的区别只是传入的参数不同。

  call 的语法为：
  ```js
    fun.call(thisArg[, arg1[, arg2[, ···]]])
  ```
  所以 apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。
#### bind
  > bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

  由此看出，bind创建一个新的函数，需要手动调用。
  ```js
    let a ={
        name : "Cherry",
        fn : function (a,b) {
            console.log( a + b)
        }
    }

    let b = a.fn;
    b.bind(a, 1, 2)             // 没有反应
    b.bind(a, 1, 2)()           // 3  需要手动调用

  ```