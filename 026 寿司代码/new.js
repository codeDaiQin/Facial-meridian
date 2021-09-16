

function Person(name) {
    this.name = name
}


// 新定义一个对象
// 对象 继承 构造函数的原型链
// 将构造函数的 this 指向这个对象
// 根据构造函数的返回值类型返回结果

function _new(constructor, ...args) {
    if (typeof constructor != 'function') throw new Error('constructor must be a function')
    let obj = Object.create(constructor.prototype)
    let result = constructor.apply(obj, args)
    return typeof result === 'object' || result instanceof Function ? result : obj
}

console.dir(_new(Person, 'mmszb'))