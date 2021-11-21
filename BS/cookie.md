# cookie 🍪
作为一段一般不超过 4KB 的小型文本数据

## 属性

| 属性名 | 描述 |
| ------ | ---- |
| name | 名字 |
| value | 值 | 
| domain | 域名 |
| path | 对应的web路由 |
| Expiress/Max-Age | cookie的有效期 Max-Age(是以秒为单位的) Expires(日期) |
| secure | cookie只会在https和ssl等安全协议下传输 |
| HttpOnly | 如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击 |
|  SameSite | 可以有下面三种值：Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。Lax 允许部分第三方请求携带 Cookie,None 无论是否跨站都会发送 Cookie, 之前默认是 None 的，Chrome80 后默认是 Lax。|
