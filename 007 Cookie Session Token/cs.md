# Cookie 和 Session
## Cookie
### 常用属性 
  1. Cookie名称，Cookie名称必须使用只能用在URL中的字符，一般用字母及数字，不能包含特殊字符，如有特殊字符想要转码。如js操作cookie的时候可以使用escape()对名称转码。
  2. Cookie值，Cookie值同理Cookie的名称，可以进行转码和加密。
  3. Expires，过期日期，一个GMT格式的时间，当过了这个日期之后，浏览器就会将这个Cookie删除掉，当不设置这个的时候，Cookie在浏览器关闭后消失。
  4. Path，一个路径，在这个路径下面的页面才可以访问该Cookie，一般设为“/”，以表示同一个站点的所有页面都可以访问这个Cookie。
  5. Domain，子域，指定在该子域下才可以访问Cookie，例如要让Cookie在a.test.com下可以访问，但在b.test.com下不能访问，则可将domain设置成a.test.com。
  6. Secure，安全性，指定Cookie是否只能通过https协议访问，一般的Cookie使用HTTP协议既可访问，如果设置了Secure（没有值），则只有当使用https协议连接时cookie才可以被页面访问。
  7. HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息。
### 

## Session
### Session简介
session 是另一种记录服务器和客户端会话状态的机制
session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的cookie 中
## Token
### Token简介
Token 是在服务端产生的。如果前端使用用户名/密码向服务端请求认证，服务端认证成功，那么在服务端会返回 Token 给前端。前端可以在每次请求的时候带上 Token 证明自己的合法地位。如果这个 Token 在服务端持久化（比如存入数据库），那它就是一个永久的身份令牌。

Token 都需要设有效期。