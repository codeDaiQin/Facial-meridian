
## 全排列
```js
function permute(nums) {
  const res = [], path = []; fn()
  return res

  function fn(used = []) {
    if (path.length === nums.length) {
      console.log(path)
      res.push(Array.from(path))
      return
    }
    for (let i in nums) {
      if (used[i]) continue
      path.push(nums[i])
      used[i] = true
      fn(used)
      used[i] = false
      path.pop()
    }
  }
}
```

## 重复字符串
```js
function isRepeatStr (str) {
  const len = str.length
  for (let i = 1; i * 2 <= len; i++) {
    if (len % i === 0) {
      let flag = true
      for (let j = i; j < len; j++) {
        if (s[j] !== s[j - i]) {
          flag = false
          break
        }
      }
      if (flag) return true
    }
  }
  return false
}
```

## 最长无重复字符串
```js
function lengthOfLongestSubstring (s) {
  let str = '', max = 0
  for (let i = 0; i < s.length;) {
    if (!str.includes(s[i])) str += s[i++]
    else str = str.substr(1)
    max = Math.max(max, str.length)
  }
  return max
};
```

### 路径总和
```js
function hasPathSum (root, targetSum) {
  if (!root) return false
  const queue = [root], vals = [root.val]
  while (queue.length) {
    const node = queue.pop(), val = vals.pop()
    if (!node.left && !node.right) {
      if (val === targetSum) return true
      else continue
    }
    if (node.left) {
      vals.push(node.left.val + val)
      queue.push(node.left)
    }
    if (node.right) {
      vals.push(node.right.val + val)
      queue.push(node.right)
    }
  }
  return false
};
```

## 复原ip地址
```js
function restoreIpAddresses (s) {
  if (s.length < 4) return []
  const res = [], path = [], fn = (i) => {
    const len = path.length
    if (len > 4) return
    if (len === 4 && i === s.length) return res.push(path.join('.'))
    for (let j = i; j < s.length; j++) {
      let str = s.substr(i, j - i + 1)
      if (str.length > 3 || +str > 255) break
      if (str.length > 1 && str[0] === '0') break
      path.push(str)
      fn(j + 1)
      path.pop()
    }
  }
  fn(0)
  return res
};
```

## 柯里化
```js 
function curry(fn, ...args) {
  const curried =
    args.length >= fn.length && fn.length !== 0
      ? fn(...args)
      : (..._args) => curry(fn, ...args, ..._args)
  curried.toString = () => fn(...args)
  return curried
}
```

## Promise
```js
class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'fulfilled'
          this.value = value
          this.onResolvedCallbacks.forEach((fn) => fn())
        }
      }, 0)
    }
    let reject = (reason) => {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'rejected'
          this.reason = reason
          this.onRejectedCallbacks.forEach((fn) => fn())
        }
      }, 0)
    }
    try { executor(resolve, reject) } catch (err) { reject(err) }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err }
    if (this.state === 'pendding') {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
    }
    if (this.state === 'resolved') onFulfilled(this.value)
    if (this.state === 'rejected') onRejected(this.value)
  }
  catch(fn) { return this.then(null, fn) }
}
```

## 三次握手

其实就是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。
进行三次握手的主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备。

* 第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号。此时客户端处于 SYN_Send 状态。

* 第二次握手：服务端接收到 SYN 报文后，会以自己的 SYN 作为响应，并且指定自己的初始化序号，同时把 客户端的初始化序号 + 1 作为 ACK 确认的值，表示服务端已经接收到了 客户端的SYN报文，此时服务端处于 SYN_Send状态。

* 第三次握手：客户端收到 SYN 报文后，会发送一个 ACK 报文，把服务端的 初始化序号 + 1 作为 ACK确认的值，表示已经收到服务端的 SYN 报文，此时客户端和服务端都处于 ESTABLISHED（建立连接）状态。此时双方已经建立连接。


## 四次挥手

* 第一次挥手：客户端会发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 终止等待1状态

  发出连接释放报文 FIN = 1 seq = u, 并 停止数据发送，主动关闭TCP 连接 进入终止等待1 状态。

* 第二次挥手：服务端收到
