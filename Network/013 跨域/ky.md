## 同源策略
1. 如果两个 URL 的 协议、域名、端口 三者相同 属于同源
2. 非同源无法发送ajax请求、无法获取cookie

## 跨域的解决方法
1. jsonp
    利用`<script>`标签的src不受同源策略影响的特性
    ```js
        // 在这里写请求地址 query形式拼接 回调函数 ?callback=fn   
        <script src='请求地址?callback=fn'></script>
        <script>
            // 在这里写 回调函数 做相应处理
            const fn = () { ...dosomething }
        </script>
    ```
    > 缺点： 只能做get请求
2. cors
    CORS 跨域资源共享
    区分: 
    * 简单请求
    * 非简单请求

    1. 请求方式为 get post head 
    2. 请求头不超过以下 字段 
        Accept 
        Accept-Language
        Content-Language
        Last-Event-ID
        Content-Type
        (application/x-www-form-urlencoded、multipart/form-data、text/plain)

    `如果是简单请求 浏览器直接发出CORS请求
    在请求头上增加Origin字段（协议 + 域名 + 端口）`

    如果Origin指定的源 不在许可范围内  返回的响应头内没有包含ACAO 抛出cors错误

    > 需要在服务端设置 Access - Contorl - Allow - Origin : '*' 或者 接受的域名

3. nginx反向代理 
    ```
    server{
        loacltion / {
            proxy_pass 转发地址
        }
    }
    ```

4. http-proxy-middleware
    在proxyTable 中添加规则 
    ```
        proxyTable: {
            '/api': {
                target: '请求地址',
                changeOrigin: true //改变源
                pathRewrite: {
                    '^/api': '请求地址' //路径重写
                }
            }
        }
    ```
    