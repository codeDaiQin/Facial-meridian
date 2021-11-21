function copyObj(obj) {
  let cloneObj = null
  //当输入数据为简单数据类型时直接复制
  if (obj && typeof obj !== 'object') { cloneObj = obj }
  //当输入数据为对象或数组时
  else if (obj && typeof obj === 'object') {
    //检测输入数据是数组还是对象
    cloneObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          //若当前元素类型为对象时，递归调用
          cloneObj[key] = copyObj(obj[key])
        }
        //若当前元素类型为基本数据类型
        else { cloneObj[key] = obj[key] }
      }

    }
  }
  return cloneObj
}