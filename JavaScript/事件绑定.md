# 事件绑定
## 时间监听
### W3C
  `element.addEventListener(event, function, useCapture)`
  * event : （必需）事件名，支持所有 DOM事件 。

  * function：（必需）指定要事件触发时执行的函数。

  * useCapture：（可选）指定事件是否在捕获或冒泡阶段执行。true，捕获。false，冒泡。默认false。

### IE标准
  `element.attachEvent(event, function)`
  * event：（必需）事件类型。需加“on“，例如：onclick。

  * function：（必需）指定要事件触发时执行的函数。


## 事件委托
  ```js
    document.addEventListener("click",function(event){
      // 通过 event.target 获取事件对象
      let target = event.target;
      if(target.nodeName == "LI"){
        alert(target.innerHTML);
      }
    })
  ```

## 阻止事件冒泡
  `event.stopPropagation( )`方法。
  `event.target`方法

## 阻止默认事件
  `event.preventDefault` W3C
  `e.returnValue = false` IE