## WEB 安全

1. XSS

    跨站脚本攻击是指恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

    例： 场景 留言板  用户恶意回复 
    `<script> alert('XSS!, document.cookie') </script>`

    
    > 相关函数 eval()


    解决方法：
    * 危险字符进行转义  < 改为 $lt; 等等  vue React 都做了转义处理 使用框架可忽略
    *  HttpOnly 禁止js对cookie的操作
    *  
2. CSRF
    
    跨站请求伪造
    
    解决方法：
    * 检查 Referer字段 
        
    > HTTP头中有一个Referer字段，这个字段用以标明请求来源于哪个地址。在处理敏感数据请求时，通常来说，Referer字段应和请求的地址位于同一域名下。

    * 添加校验token


3. SQL注入

    SQL注入攻击是通过操作输入来修改SQL语句，用以达到执行代码对WEB服务器进行攻击的方法。
    