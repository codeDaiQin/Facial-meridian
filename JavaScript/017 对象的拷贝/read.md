# 对象的拷贝
## 浅拷贝
#### 1. 拷贝指针 (直接赋值)
  ```js
    // 这里的obj只是指针
    let obj = {
      a: 1
    }
  ```
    // 相同的引用
    let obj1 = obj;
    console.log(obj1 == obj); 
    => true 直接复制只是复制对象的指针，还指向同一个对象


## 深拷贝
#### 1. JSON 方法
  ###### 适合情况：
    JSON对象的深度克隆。方法是先JSON.stringify() 转为json字符串
    再JSON.parse() 转为json数组
  ###### 缺点：
    1. 无法被拷贝下对象里的函数
    2. 无法拷贝Obj对象原型链上的属性和方法
  ```js
    let user = {
      name: 'MMSZB',
      trait: {
          height: 1.60,
          weight: 80,
          hobbits: ["吃", "睡"]
      }
    };
    //不同的引用
    let user3 = JSON.parse(JSON.stringify(user));
    console.log(user3 == user) //false  通过json方法复制后的地址不一样
  ``` 
  #### 2.  ...操作符
  ```js
    let obj = {
      a: 1
    }
    let obj2 = {...obj}
  ```
  搞不懂
  #### 3. Object.assign()
  <code>Object.assign(target, source1, source2, ···);</code>
  方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
  Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
  注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

  ### Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。也就是说，如果对象的属性值为简单类型（如string， number），通过Object.assign({},srcObj);得到的新对象为深拷贝；如果属性值为对象或其它引用类型，那对于这个对象而言其实是浅拷贝的。

  ### 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，但是对象中有对象的时候，此方法，在二级属性以后就是浅拷贝。
  ```js
    user3 = Object.assign({}, user)
    user3.trait.height = 1.6
    console.log(user3, user)  //  1.6  1.6  二级属性是浅拷贝了 
    user4 = Object.assign(user) 
    user4.name = 'yanzao'
    console.log(user4.name, user.name); // yanzao  yanzao  一级属性是深拷贝
  ```

