

const curry = (fn, ...args = []) => {
  // let _args = args || []
  let len = _args.length
  return (...rest) => {
    let copyArgs = _args.slice(0)
    copyArgs.push(...rest)
    if (copyArgs.length < len) return curry.call(this, fn, ...copyArgs)
    else return fn.apply(this, copyArgs)
  }
}

const sum = (...args) => args.reduce((x, y) => x + y)
// const curryAdd = ()
console.log(curry(sum, 1, 2, 3, 4)());