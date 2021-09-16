// 事件中心
class Vue {
  constructor() {
    this.subs = {}
  }
  // 订阅
  $on(e, fn) {
    this.subs[e] = this.subs[e] || []
    this.subs[e].push(fn)
  }
  // 发布
  $emit(e) {
    if (this.subs[e]) {
      this.subs[e].forEach(fn => { fn() })
    }
  }
}


let vue = new Vue()
vue.$on('hhh', () => {
  console.log(666);
})
vue.$emit('hhh')







class MyVue {
  constructor() {
    this.subs = {}
  }
  // 订阅
  $on(e, fn) {
    this.subs[e] = this.subs[e] || []
    this.subs[e].push(fn)
  }
  // 发布
  $emit(e) {
    if (this.subs[e]) {
      this.subs[e].forEach(fn => fn())
    }
  }
}

let myVue = new MyVue()

myVue.$on('唱歌事件', () => { console.log('唱歌') })

myVue.$emit('唱歌事件')