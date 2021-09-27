
## HTTP 各个版本

1. HTTP 1.0 

* 支持 GET POST HEAD请求

* 每次通信必须包括header信息

* 任何格式的内容都可以发送

* 不支持断点续传

* 根据header 中的 Expires和 if-Modified-Since作为缓存失效的标准

* 请求信息中没有 hostname


2. HTTP 1.1     > 1999年发布

* 支持长链接 TCP默认不关闭

* 新增 PUT、PATCH、OPTIONS、DELETE 

* 新增 多路复用技术 在一个TCP连接 中可以发送多个请求

* 支持断点续传 通过使用 header的 range 来实现

* 新增E-tag、if-Unmodified-Since、If-Match、If-None-Match 等缓存控制标头

* 使用虚拟网络，一台物理服务器上可以存在多个虚拟主机，并且共享一个 IP 地址