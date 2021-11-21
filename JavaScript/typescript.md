##萌萌手抓饼的TypeScript笔记
#### 1.基础基础基础 ！
1. 布尔 Boolean
  ```typescript
    let cute:boolean = true
  ```
1. 数值 number
  ```typescript
    let num:number = 0xff //16进制
  ```
3. 字符串 string
  ```typescript
    let str:string = "萌萌手抓饼"
  ```
4. 空值 void
  ```typescript
    function eat() :void{
      console.log('干饭了!')
    }
  ```
5. Null undefined
  ```typescript
    let u: undefined = undefined;
    let n: null = null;
  ```
6. any 
  <code>any</code>可以赋值为任意类型
  ```typescript
    let str: any = "萌萌手抓饼"
    str = 996
  ```
7. 类型推论
  ```typescript
    let age = 'seven';
    age = 7;
    // 等价于
    let age: string = 'seven';
    age = 7;.
    // 如果定义的时候没有赋值，不管之后有没有赋值
    // 都会被推断成 any 类型而完全不被类型检查
    let age;
    age = 'seven';
    age = 7;
  ```
8. 联合类型
  ```typescript
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
  ```
  无法判断到底是哪个类型时 可使用联合类型
  ```typescript
    function getString(something: string | number): number {
        return something.toString();
    }
  ```
9. 接口interface
  用来定义对象的类型
  不允许 多属性（除非有任意属性）或者 少属性*  类型必须和接口一致
  ```typescript
    interface User {
      uname: string,
      readonly age: number,  //只读属性  只能在创建时候赋值 后续无法修改
      foolish: boolean,
      server?: boolean,   //可以使用可选属性 ，
      [propName: string]: string | number | boolean
      //可以使用任意属性  任意属性包含可选属性
    }
  ```  
  需要注意的是，一旦定义了任意属性
  那么确定属性和可选属性的类型都必须是它的类型的子集
  使用 接口
  ```typescript
    let mmszb: User {
      uname: "萌萌手抓饼",
      age: 18,
      foolish: true,
      server: true
    }
  ```
10. 数组
  ```typescript
    let arr1: number[] = [1, 2, 3, 4, 5]
    let arr2: Array<number> = [1, 2, 3, 4, 5]   //泛型

    interface NumberArray {
      [index: number]: number
    }
    let arr3: NumberArray = [1, 2, 3, 4, 5]  //用接口描述数组

    //any的应用
    let list: any[] = ['萌萌手抓饼', 25, { website: 'http://www.mmszb.com' }];
  ```
11. 函数的类型
  ```typescript
    // 规定参数类型 和返回值
    function reverseStr (str: string): string {
      return str.split('').reverse().join('') // 翻转字符串
    }
  ```
  用接口定义函数
  ```TypeScript
    interface reverseStrFunc {
      (str: string): string
    }
    let reverseStr: reverseStrFunc;
    reverseStr = function(str: string): string {
      return str.split('').reverse().join('')
    }
  ``` 
  可选参数 -- 用<code>?</code>表示
    可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了
  ```ts
    function createCat(firstName: string, lastName?: string): string {
      return `${firstName} · ${lastName}`
    }
  ```
  参数默认值
  ```ts
    function buildName(firstName: string, lastName: string = 'Cat') {
      return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
  ```
  剩余参数
  ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）
  ```ts
    function push(array: any[], ...items: any[]) {
      items.forEach(function(item) {
        array.push(item);
      });
      return array
    }
  ```
  重载
  重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
  ```ts
  // 比如，我们需要实现一个函数 reverse，输入数字 123 的时候
  // 输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
  }
  
  ```
  注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

  12. 类型断言
  将一个联合类型断言为其中一个类型
  之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：  
  ```ts
    interface Cat {
      name: string;
      run(): void;
    }
    interface Fish {
      name: string;
      swim(): void;
    }
    function getName(animal: Cat | Fish) {
      //  return animal.name  会出错  
      // 此时可以使用类型断言，将 animal 断言成 Fish
      retrun  (animal as Fish).name  // fish
    }
  ```
  13. 声明文件
  当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
  略 ···

  14. 内置对象
  ```ts
    let b: Boolean = new Boolean(1)
    let e: Error = new Error('Error occurred')
    let d: Date = new Date()
    let r: RegExp = /[a-z]/
    let body:HTMLElement = document.body
    let allDiv: NodeList = document.querySelectorAll('div')
  ```
  #### 2.进阶进阶进阶咯 ！
  1. 元组

  ```ts
    let arr: [string, number] = ['mmszb', 123]
    
  ```

