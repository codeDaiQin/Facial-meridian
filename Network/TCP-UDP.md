# TCP 与 UDP 的 区别

| TCP        | UDP        |      |
| ---------- | ---------- | -------- |
| 面向连接   | 面向无连接 | 是否连接 |
| 面向字节流 | 面向报文   | 传输方式 |
| 可靠传输 顺序和正确性，流量控制、拥塞控制 | 不可靠 无 | 是否可靠 |
| [20, 60]字节 | 8字节 | 头部开销 |
| 单播 | 单播、多播、广播 | 传输方式 |

## TCP的拥塞控制机制

* 慢启动

  开始时不发送大量数据，先测试网络的拥塞程度，从小到大增加滑动窗口大小。

* 拥塞控制



* 快速重传
* 快速恢复
