# ES6

## Class
### 1. 基本语法
  下面代码定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5的构造函数，对应ES6的类的构造方法。
  类除了构造方法，还定义了一个`eat`方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。
  ```js
    class Yanzao {
      constructor(name, age) {
        this.name = name
        this.age = age
      }
      eat() {
        return `I like eat~`
      }
    }
    // 使用时
    let user = new Yanzao('盐藻', 18)
  ```
  构造函数的`prototype`属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。
### 2. Class的继承
  Class之间可以通过`extends`关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。
  ```js
    class Chihuo extends Yanzao {}
  ```
  上面代码定义了一个`Chihuo`类，该类通过`extends`关键字，继承了`Yanzao`类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个`Yanzao`类。下面，我们在`Chihuo`内部加上代码。
  ```js
    class Chihuo extends Yanzao {
      constructor(name, age, foods) {
        super(name, age)   //调用父类的constructor(name, age)
        this.likes = foods
      }
      likefoods(){
        return super.eat() + this.likes   //调用父类的方法
      }
    }
  ```
  上面代码中，`constructor`方法和`eat`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。
  子类必须在`constructor`方法中调用`super`方法，__否则新建实例时会报错__。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。
### 3. Class的取值函数（getter）和存值函数（setter）
  可以在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
  ```js
    class MyClass {
      constructor() {
        // ...
      }
      get prop() {
        return 'getter';
      }
      set prop(value) {
        console.log('setter: '+value);
      }
    }

    let inst = new MyClass();

    inst.prop = 123;
    // setter: 123

    inst.prop
    // 'getter'
  ```
  上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。  
### 4. Class 的静态方法
  类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
  ```js
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    Foo.classMethod() // 'hello'

    var foo = new Foo();
    foo.classMethod()
    // TypeError: foo.classMethod is not a function
  ```
  上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

  父类的静态方法，可以被子类继承。
  ```js
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }

    class Bar extends Foo {
    }

    Bar.classMethod(); // 'hello'
  ```
  上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。
### 5. Mixin模式的实现
  Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。

## Promise 对象
### Promise的特点
  * 对象的状态不受外界影响，有三种状态: __`Pending`__(进行中),__`Resolved`__ 或 __`Fulfilled`__(已完成),__`Rejected`__(已失败)，只有Promise的结果可以影响状态。
  * 状态一旦确定，就不会再改变。状态改变有两种可能：从`Pending` 变成 `Resolved` 和 从`Pending` 变成 `Rejected` 。
  * `Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
### Promise.all()
  Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
  ```js
    let p = Promise.all([p1, p2, p3])
  ```
  上面代码中，`Promise.all`方法接受一个数组作为参数，p1、p2、p3都是`Promise`对象的实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为`Promise`实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）
  p的状态由 `p1`、`p2`、`p3`决定。
  *  `p1`、`p2`、`p3`的状态都变成`Resolved` p的状态也变成`Resolved`, 此时`p1`、`p2`、`p3`实例的返回值会组成一个数组，作为p的返回值。
  *  `p1`、`p2`、`p3`其中有一个变成`Rejected` p的状态也变成`Rejected`,其中第一个被`reject`的实例的返回值，会作为p的返回值。
  总的来说，只有全部实例的状态变为`Resolved`  或者其中一个实例的状态变为 `Rejected` 才会调用 `Promise.all` 后面的回调函数`(成功.then、失败.catch)` 
### Promise.race()
  Promise.race方法用于将多个Promise实例，包装成一个新的Promise实例。
  ```js
    let p = Promise.race([p1, p2, p3])
  ```
  上面代码中 p的状态由 `p1`、`p2`、`p3`决定。只要其中一个实例的状态改变。p的状态也会随之变化。那个率先改变的实例状态值，会作为p的状态值。

  下面是一个例子，如果指定时间内没有获得结果，就将Promise的状态变为`reject`，否则变为`resolve`。
  ```js
    const p = Promise.race([
      fetch('/resource-that-may-take-a-while'),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
      })
    ]);
    p.then(response => console.log(response));
    p.catch(error => console.log(error));
  ```
  上面代码中 如果5秒之内fetch方法没有返回结果，则p的状态就改变为`Rejected`,从而触发`catch`方法制定的内容。
### Promise.resolve()
  把现有的对象转换为Promise对象。
  会出现以下几种情况。
  * 参数是一个`Promise`实例
    不做任何修改 直接返回
  * 参数是一个`thenable`对象
    `thenable`对象是指具有`.then`方法的对象
    `Promise.resolve()`会将这个对象转换为`Promise`对象，然后执行`.then`方法
    执行完后，状态改变为`Resolved`
  * 参数是一个不具备`.then`方法的对象或者根本不是一个对象
    会返回一个新的Promise对象，状态为`Rejected`
  * 不带任何参数
    会直接返回一个状态为`Rejected`的Promise实例
### Promise.reject()
  会返回一个新的`Promise`实例，状态为`Rejected`。



## Genertor 函数
### 基本概念
  读音  `詹妮瑞特`
  Generator 函数有多种理解角度。从语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
  形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`语句，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。
  ```js
    function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }

    let hw = helloWorldGenerator();
  ```
  上面代码定义了一个Generator函数`helloWorldGenerator`，它内部有两个`yield`语句“hello”和“world”，即该函数有三个状态：hello，world和return语句（结束执行）。

  然后，Generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用Generator函数后，__该函数并不执行__，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。

  下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`语句（或`return`语句）为止。换言之，Generator函数是分段执行的，`yield`语句是暂停执行的标记，而`next`方法可以恢复执行。
  ```js
    hw.next()
    // { value: 'hello', done: false }

    hw.next()
    // { value: 'world', done: false }

    hw.next()
    // { value: 'ending', done: true }

    hw.next()
    // { value: undefined, done: true }
  ```
  上面代码一共调用了四次next方法。

  第一次调用，Generator函数开始执行，直到遇到第一个`yield`语句为止。`next`方法返回一个对象，它的`value`属性就是当前`yield`语句的值hello，`done`属性的值false，表示遍历还没有结束。

  第二次调用，Generator函数从上次`yield`语句停下的地方，一直执行到下一个`yield`语句。`next`方法返回的对象的`value`属性就是当前`yield`语句的值world，`done`属性的值false，表示遍历还没有结束。

  第三次调用，Generator函数从上次`yield`语句停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。`next`方法返回的对象的`value`属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则`value`属性的值为undefined），`done`属性的值true，表示遍历已经结束。

  第四次调用，此时Generator函数已经运行完毕，`next`方法返回对象的`value`属性为undefined，`done`属性为true。以后再调用`next`方法，返回的都是这个值。

  总结一下，调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`语句后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。
### yield语句
  由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`语句就是暂停标志。
  遍历器对象的next方法的运行逻辑如下。
  * 1. 遇到`yield`语句，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的value属性值。
  * 2. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
  * 3. 如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
  * 4. 如果该函数没有return语句，则返回的对象的value属性值为undefined。

需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
```js
  function* gen(){
    yield 123 + 456  //next时才会执行
  }
```
上面代码中，yield后面的表达式`123 + 456`，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

yield语句与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。正常函数只能返回一个值，因为只能执行一次return；Generator函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是“生成器”的意思）。

## async 函数
读音 `哀think`
### 含义
  ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

  `async` 函数是什么？一句话，它就是 Generator 函数的语法糖。

  `async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。

  `async`函数对 Generator 函数的改进，体现在以下四点。
  * 内置执行器。
    Generator 函数的执行必须靠执行器，所以才有了`co(用于 Generator函数的自动执行的小工具 tj发布。)`模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
    调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行，得到最后结果。
  * 更好的语义。
    `async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。
  * 更广的适用性。
    `co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
  * 返回值是Promise
    `async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。


## Set和Map数据结构
### Set基本语法
  ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
  Set 本身是一个构造函数，用来生成 Set 数据结构。
  ```js
    const s = new Set();

    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

    for (let i of s) {
      console.log(i);
    }
    // 2 3 5 4
  ```
### Set实例的属性和方法
  __Set结构的实例有以下属性。__

  `Set.prototype.constructor`：构造函数，默认就是Set函数。
  `Set.prototype.size`：返回Set实例的成员总数。
  Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

  `add(value)`：添加某个值，返回Set结构本身。
  `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
  `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
  `clear()`：清除所有成员，没有返回值。
  上面这些属性和方法的实例如下。
  ```js
    mmszb.add(1).add(2).add(2);
    // 注意2被加入了两次

    mmszb.size // 2

    mmszb.has(1) // true
    mmszb.has(2) // true
    mmszb.has(3) // false

    mmszb.delete(2);
    mmszb.has(2) // false    
  ```
  `Array.from`方法可以将Set结构转为数组。
  ```js
    let items = new Set([1, 2, 3, 4, 5]);
    let array = Array.from(items);
  ```
  __遍历操作__
  Set结构的实例有四个遍历方法，可以用于遍历成员。
  `keys()`：返回键名的遍历器
  `values()`：返回键值的遍历器
  `entries()`：返回键值对的遍历器
  `forEach()`：使用回调函数遍历每个成员

  #### WeakSet
  WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

  首先，WeakSet的成员只能是对象，而不能是其他类型的值。

  其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

### Map结构的目的和基本用法
  本质上是健值对的集合，类似集合
  可以遍历，可以跟各种数据格式转换

  ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。
  ```ts
    let map = new Map();

    let k1 = ['a'];
    let k2 = ['a'];

    map
    .set(k1, 111)
    .set(k2, 222);

    map.get(k1) // 111
    map.get(k2) // 222
  ```
### Map实例的属性和操作方法
  * `size`属性 返回Map结构成员总数。
  * `set(key, value)`方法   设置`key`所对应的键值，然后返回整个`Map`结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。
  * `get(key)`方法 读取`key`对应的键值，如果找不到`key`，则返回`undefined`。
  * `has(key)`方法 返回一个布尔值，表示某个键是否在Map数据结构中。
  * `delete(key)`方法 `delete`方法删除某个键，返回true。如果删除失败，返回false。
  * `clear()` 方法 清除所有成员， 没有返回值。
  
  __遍历方法__
  Map原生提供三个遍历器生成函数和一个遍历方法。

  `keys()`：返回键名的遍历器。
  `values()`：返回键值的遍历器。
  `entries()`：返回所有成员的遍历器。
  `forEach()`：遍历Map的所有成员。
  需要特别注意的是，Map的遍历顺序就是插入顺序。
  
  #### WeakMap

  WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外）不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。

## Symbol
### 概述
  ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

  Symbol值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
  ```js
    let [str1, str2] = [Symbol('1'), Symbol('1')]
    console.log(str1 === str2)  //false  都是独一无二
  ```
  ```js
    let name = Symbol('name');
    let product = {
        [name]:"洗衣机",   //在对象中键名使用symbol类型 
        "price":799
      };
      Reflect.ownKeys(product);
  ```

## Module
### 概述
  export 和 import 


## Proxy
### 概述
  Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。