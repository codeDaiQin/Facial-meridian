# Event Loop
## 浏览器 の Event Loop

在JavaScript中，任务被分为`Task`（又称为`MacroTask`,宏任务）和`MicroTask`（微任务）两种。

> * MacroTask : script(整体代码), setTimeout, setInterval, setImmediate（node独有）, I/O, UI rendering
> * MicroTask : process.nextTick（node独有）, Promises, Object.observe(废弃), MutationObserver

##### 具体实现: 
浏览器会不断从task队列中按顺序取task执行，每执行完一个task都会检查microtask队列是否为空（执行完一个task的具体标志是函数执行栈为空），如果不为空则会一次性执行完所有microtask。然后再进入下一个循环去task队列中取下一个task执行，以此类推。


## Node.js の Event Loop

nodejs的event loop分为6个阶段，它们会按照顺序反复运行，分别如下：
* 1. timers：执行setTimeout() 和 setInterval()中到期的callback。
* 2. I/O callbacks：上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行
* 3. idle, prepare：队列的移动，仅内部使用
* 4. poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
* 5. check：执行setImmediate的callback
* 6. close callbacks：执行close事件的callback，例如socket.on("close",func)

##### 具体实现：
不同于浏览器的是，在每个阶段完成后，而不是MacroTask任务完成后，microTask队列就会被执行。这就导致了同样的代码在不同的上下文环境下会出现不同的结果