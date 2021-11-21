## Webworker

浏览器原生提供`Worker()`构造函数，用来供主线程生成 Worker 线程。
```js
const myWorker = new Worker(jsurl, options)
```
`Worker()`构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。
```js
// 主线程
const myWorker = new Worker(jsurl, { name : 'mmszb' });

// Worker 线程
myWorker.name // mmszb
```

### 注意事项：
* 同源限制
* DOM限制
  Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以使用`navigator`对象和`location`对象。
* 通信联系
  Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
  主线程调用`worker.postMessage()`方法，向 Worker 发消息。
  ```js
    worker.postMessage('hhh')
    worker.postMessage({ name: 'mmc' })
  ```
  主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息
  ```js
  worker.onmessage = function (event) {
    console.log('Received message ' + event.data); // data是worker发来的数据
    doSomething();
  }
  ```
  Worker 完成任务以后，主线程就可以把它关掉。
  ```js
    worker.terminate();
  ```

* 脚本限制
  Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
* 文件限制
  Worker 线程无法读取本地文件，即不能打开本机的文件系统`（file://）`，它所加载的脚本，必须来自网络。

### Worker线程

Worker 线程内部需要有一个监听函数，监听`message`事件。

```js
  this.addEventListener('message', function(e) {
    console.log(e.data) // e.data能获取到传送来的数据
    this.postMessage('收到啦') // 方法用来向主线程发送消息。
  })
```

关闭Worker
```js
  // 主线程
  worker.terminate();

  // Worker 线程
  self.close();
```