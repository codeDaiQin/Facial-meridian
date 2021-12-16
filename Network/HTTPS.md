# HTTP + SSL/TLS



在传输层对网络进行加密

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98d1a5094da4e~tplv-t2oaga2asx-watermark.awebp)
## 概述
TLS 是由 SSL3.0 演变而来, SSL已经被TLS取代

TLS 指代安全层。 TLS 握手是启动 HTTPS 通信的过程，类似于 TCP 建立连接时的三次握手。 在 TLS 握手的过程中，通信双方交换消息以相互验证，相互确认，并确立它们所要使用的加密算法以及会话密钥 (用于对称加密的密钥)。

## 握手

* 确定版本

  握手第一步是客户端向服务端发送 Client Hello 消息，这个消息里包含了一个客户端生成的随机数 Random1、客户端支持的加密套件（Support Ciphers）和 SSL Version 等信息
* 确定双方密码组合

  第二步是服务端向客户端发送 Server Hello 消息，这个消息会从 Client Hello 传过来的 Support Ciphers 里确定一份加密套件，这个套件决定了后续加密和生成摘要时具体使用哪些算法，另外还会生成一份随机数 Random2。注意，至此客户端和服务端都拥有了两个随机数（Random1+ Random2），这两个随机数会在后续生成对称秘钥时用到

* 客户端通过服务器的公钥和数字证书上的数字签名验证服务端的身份
  
* 生成会话密钥，该密钥将用于握手结束后的对称加密

![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/1/5/160c5b10d3f27e00~tplv-t2oaga2asx-watermark.awebp

## 对称加密和 非对称加密

