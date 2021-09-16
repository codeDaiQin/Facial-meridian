# ES各版本特性

## ES6
## ES7
  * 指数操作符
  ```js
    2**10; //  1024, 类似Math.pow(2, 10);
  ```
  * Array.prototype.includes()
  ```js
    [1, 2, 3].includes(1); // true  检测是否包含
  ```
## ES8
  * async/await
  ```js
    async getData() {
      const res = await api.getTableData(); // await 异步任务
      // do sth.
    }
  ```
  * Object.values()
  ```js
    Object.values({a: 1, b: 2, c: 3}); // [1, 2, 3];
  ```
  * Object.entries()
  ```js
    Object.entries({a: 1, b: 2, c: 3}); 
    // [['a', 1], ['b', 2], ['c', 3]];
  ```
  * String padding
  ```js
    'hello'.paddingStart(10);  // '          hello';
    'hello'.paddingEnd(10);  //  'hello          ';
  ```
  * 函数参数列表结尾允许逗号
  * 列出对象所有属性的描述对象集合Object.getOwnPropertyDescriptors
## ES9
  * 异步迭代await与for of结合循环使用，串行运行异步操作
  ```js
    async function process (array) {
      for await (let i of array) {
        // do sth.
      }
    }
  ```
  * Promise.finally()
  ```js
    Promise.resolve().then(res => res).catch(e => e).finally();
  ```
## ES10
## ES11
## ES12
