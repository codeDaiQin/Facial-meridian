# ES5 继承 和 ES6 继承的区别
ES6使用语法 class B extends A继承，ES6类继承是ES5函数继承的语法糖，把ES6的继承通过Babel转义成ES5之后，发现它是通过object.create方法实现了（1）B.proto = A。表示子类B继承父类A的静态属性。通过Object.setPropertypeOf()方法实现（2）B.prototype.proto = A.prototype 。这与组合继承相同。 
（一） ES6继承同时存在两条继承链。ES5是没有第一条原型链的。
（二） ES6的子类必须在constructor方法中调用super()方法，super()代表调用父类的构造函数，因为子类没有自己的this对象，所以子类要先继承父类的this。但ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
（三） ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的。
