# defer和async的区别


当浏览器碰到 script 脚本的时候：

```js 
  <script src="script.js"></script>
```
没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素读到就加载并执行。
```js 
  <script async src="script.js"></script>
```
有 async，加载和渲染`后续文档`元素的过程将和 script.js 的加载与执行并行进行（异步）。
```js 
  <script defer src="script.js"></script>
```
有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的`执行要在所有元素解析完成之后，事件触发之前完成`。


