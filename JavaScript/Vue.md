## Vue 
#### 01. __MVVM 原理__
MVVM是`Model-View-ViewModel`缩写，也就是把`MVC`（M是指业务模型，V是指用户界面，C则是控制器）中的`Controller`控制器演变成`ViewModel`。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到ViewModel层并自动将数据渲染到页面中，视图变化的时候会通知ViewModel层更新数据。
#### 02. __Vue2.x响应式数据原理__
* Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。
* Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
* Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。、
* Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。

> 初始化阶段，一方面Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter/setter，实现数据变化监听功能；另一方面，Vue 的指令编译器Compile 对元素节点的指令进行扫描和解析，初始化·视图，并订阅Watcher 来更新视图， 此时Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。
>当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用Dep.notify()，Dep 开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。
#### 03. __Vue3响应式数据原理__
  Vue3.x改用ES6的`Proxy`替代`Object.defineProperty`。Proxy 的代理是针对整个对象的，而不是对象的某个属性，因此不同于` Object.defineProperty `的必须遍历对象每个属性，Proxy 只需要做一层代理就可以监听同级结e构下的所有属性变化，当然对于深层结构，递归还是需要进行的。此外Proxy支持代理数组的变化。

  Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
  `new Proxy(obj)`对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象obj，去读写它的属性，就会触发 `set` 和 `get` 函数里的内容。
#### 04. __Vue检测变化的注意事项__
  由于 JaVaScript 的限制，Vue 不能检测数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。
  ##### 关于对象
  Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。
  ##### 关于数组

  使用 `Vue.set(vm.items, indexOfItem, newValue)`
  或者 `vm.items.splice(indexOfItem, 1, newValue)`
#### 05. __nextTick__
  异步更新队列：
  Vue是依靠数据驱动视图更新的，该更新的过程是异步的。即：当侦听到你的数据发生变化时， Vue将开启一个队列（该队列被Vue官方称为异步更新队列）。视图需要等队列中所有数据变化完成之后，再统一进行更新。
#### 06. __依赖收集原理__
  每个组件实例都有相应的 Watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
  这里有三个重要的概念
   * `Observer` 类主要给响应式对象的属性添加 getter/setter 用于依赖收集与派发更新
   * `Dep` 类用于收集当前响应式对象的依赖关系
   * `Watcher` 类是观察者，实例分为渲染 watcher、计算属性 watcher、侦听器 watcher三种
#### 07. __生命周期__
  * `beforeCreate`是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。
  * `created`在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过Vm.$nextTick来访问Dom。
  * `beforeMount`发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。
  * `mounted`在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。
  * `beforeUpdate`发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
  * `updated`发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
  * `beforeDestroy`  读音 `#抵死照哀#`发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
  * `destroyed`发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁
#### 08. __v-if和v-show的区别__
  * `v-if` 有更高的切换消耗；`v-show` 有更高的初始渲染消耗；
  * `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
  * `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
  * 带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property display。
  * 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
  * 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。
#### 09. __v-model的原理__
  v-model="text"是:value="text" @input="text = $event.target.value"的缩写。
  * 文本框
  ```html
      <input type="text" :value="price" @input="price = $event.target.value" />
  ```
  * 对于复选框
  ```html
      <input type="checkbox" :checkd="value" @change="handleChecked"/>
  ```
#### 10. __事件绑定原理__
  vue中的事件绑定是有两种:
  * 一种是原生的事件绑定，另一种是组件的事件绑定。原生的事件绑定在普通元素上是通过`@click`进行绑定。
  * 官网已经说明，要是想在组件上绑定原生事件，需要加上 native 修饰符。通过`@click.native`进行绑定，组件中的nativeOn是等价于on的。组件的事件绑定的@click是vue 中自定义的 $on 方法来实现的，必须有`\$emit`才可以触发。
#### 11. __Computed和Watch__
  * Computed
      是一个计算属性,类似于过滤器,对绑定到view的数据进行处理
      * get用法
      ```js
        computed: {
            // 这里默认是get方式
            // 这个名称不能和data里参数重名
            fullName(){
                return 1;
            }
        }
      ```
      * get和set用法
      ```js
      computed: {
          fullName: {
              //回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
              get() {
                  return 1;
              },
              //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
              //val就是fullName的最新属性值  用fullName = 1 的方式
              set(val) {
                  console.log(val);
                  this.test = val;
              }
          }
      }
      ```
  * Watch
      watch是一个观察的动作
      ```js
          // 会监听制定属性的变化 
          test(newVal, oldVal) {
              onsole.log("test change", oldVal, newVal);
          }
      ```
      监听复杂数据类型需用深度监听
      console.log打印的结果,发现oldVal和newVal值是一样的,所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化
      ```js
          // 深度监听
          test: {
              deep: true,
              handler(newVal, oldVal) {
                  console.log("test change", oldVal, newVal);
              },
          },
      ```
  computed特性
  1. 是计算值，
  2. 应用：就是简化tempalte里面{{}}计算和处理props或$emit的传值
  3. 具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数
  watch特性
  1. 是观察的动作，
  2. 应用：监听props，$emit或本组件的值执行异步操作
  3. 无缓存性，页面重新渲染时值不变化也会执行
#### 12. __keep-alive__
 keep-alive是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
 ##### 使用场景
 用户在某个列表页面选择筛选条件过滤出一份数据列表，由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。
 keep-alive就是用来解决这种场景。当然keep-alive不仅仅是能够保存页面/组件的状态这么简单，它还可以避免组件反复创建和渲染，有效提升系统性能。总的来说，keep-alive用于保存组件的渲染状态。
 ##### 用法
 * 在动态组件中的应用
 ```html
     <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
         <component :is="currentComponent"></component>
     </keep-alive>
 ```
 * 在vue-router中的应用
 ```html
     <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
         <router-view></router-view>
     </keep-alive>
 ```
 `include`定义缓存白名单，`keep-alive`会缓存命中的组件；`exclude`定义缓存黑名单，被命中的组件将不会被缓存；`max`定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。
 ```js
     内存管理的一种页面置换算法，对于在内存中但又不用的数据块（内存块）叫做LRU,
     操作系统会根据哪些数据属于LRU而将其移出内存而腾出空间来加载另外的数据。
 ```
#### 13. __Vue中组件之间的通信__
  父子组件通信
  * v-bind / props
      父组件A通过v-bind / props的方式向子组件B传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。
  * 子组件向父组件传值（通过事件形式）
      ```js
        this.$emit('事件名', '传递的参数') //自定义事件 传值
      ```
        
        父组件通过$on监听子组件的事件

      ```js
        this.$on('事件名', (参数) => {
          // 处理
        })
      ```
    * Vuex
    
    * `$attrs`和`$listeners ` 
    
      ```js
        // 父组件传值
        <child-com1
        :foo="foo"
        :boo="boo"
        :coo="coo"
        :doo="doo"
        title="前端工匠"
        >
        
        </child-com1>

        // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
        inheritAttrs: false,   // 默认ture
        // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
        console.log(this.$attrs); 
        props: {
            foo: String // foo作为props属性绑定
            // 如果为inheritAttrs为true  则  $attrs中没有没有 foo 
        },
      ```

  * `$parent` / `$children`与 `ref`
    ```html
        <template>
            <child-cpn ref="mmszb"></child-cpn>
        </template>
        <script>
        export default {
            mounted () {
                const mmszb = this.$refs.mmszb;
                console.log(mmszb.title);  // 拿到 数据
                mmszb.sayHello();  // 调用 方法
            }
        }
        </script>
      ```
      
#### 14. __组件中的data为什么是一个函数__
  如果两个实例引用同一个对象，当其中一个实例的属性发生改变时，另一个实例属性也随之改变，只有当两个实例拥有自己的作用域时，才不会相互干扰。
  这是因为JavaScript的特性所导致，在component中，data必须以函数的形式存在，不可以是对象。
  组建中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，它们只负责各自维护的数据，不会造成混乱。而单纯的写成对象形式，就是所有的组件实例共用了一个data，这样改一个全都改了。
#### 15. __Vue的路由实现：hash模式 和 history模式__
  在vue的路由配置中有mode选项 最直观的区别就是在url中 hash 带了一个很丑的 # 而history是没有#的
      mode:"hash";  
      mode:"history";
  __hash模式和history模式的不同__
  对于vue这类渐进式前端开发框架，为了构建 SPA（单页面应用），需要引入前端路由系统，这也就是 Vue-Router 存在的意义。前端路由的核心，就在于 —— 改变视图的同时不会向后端发出请求。
  __为了达到这一目的，浏览器当前提供了以下两种支持：__
  * #后面 hash 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面通过监听 hashchange 事件（`window.onhashchange`）可以知道 hash 发生了哪些变化，然后根据 hash 变化来实现更新页面部分内容的操作。
  * history —— 利用了window.history 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。
  * 因此可以说，hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由.history 模式需要后端配合将所有访问都指向 index.html，否则用户刷新页面，会导致 404 错误。
#### 16. __Vuex__
__属性__
  * state：vuex的基本数据，用来存储变量
  * geeter：从基本数据(state)派生的数据，相当于state的计算属性
  * mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action)。每个mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
  * action：和mutation的功能大致相同，不同之处在于 ==》1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作。
  * modules：模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。    
#### 17. __Vue中 key 值的作用__
  当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM 
  ```html
      <template>
          <label>Username</label>
          <input placeholder="Enter your username">
      </template>
      <template>
          <label>Email</label>
          <input placeholder="Enter your email address">
      </template>
  ```
  那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`。
  ```html
      <template>
          <label>Username</label>
          <input placeholder="Enter your username">
      </template>
      <template>
          <label>Email</label>
          <input placeholder="Enter your email address">
      </template>
  ```
  现在，每次切换时，输入框都将被重新渲染。
#### 18. __Vue等单页面应用及其优缺点__
  __优点__：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简洁、高效、快速、模块友好。
  __缺点__：不支持低版本的浏览器，最低只支持到IE9；不利于SEO的优化（如果要支持SEO，建议通过服务端来进行渲染组件）；第一次加载首页耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。
#### 19. __怎么定义 vue-router 的动态路由? 怎么获取传过来的值__
  在 router 目录下的 index.js 文件中，对 path 属性加上 /:id，使用 router 对象的 `params.id` 获取。
#### 20. __Vue中的修饰符__
   * 事件修饰符
  在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
  为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。
   * `.stop` 阻止事件继续传播
   * `.prevent` 阻止标签默认行为
   * `.capture` 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
   * `.self` 只当在 event.target 是当前元素自身时触发处理函数
   * `.once` 事件将只会触发一次
   * `.passive` 告诉浏览器你不想阻止事件的默认行为
   ```html
    <!-- 阻止单击事件继续传播 -->
    <a v-on:click.stop="doThis"></a>

    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>

    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>

    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>

    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>

    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>
   ```
   使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用v-on:click.prevent.self会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
   v-model的修饰符
   * `.lazy` 默认情况下，v-model同步输入框的值和数据。可以通过这个修饰符，转变为在change事件再同步。
   * `.number`自动将用户的输入值转化为数值类型
   * `.trim`自动过滤用户输入的首尾空格
   键盘事件的修饰符
   ```html
      <input v-on:keyup.13="submit">
      <input @keyup.enter="submit">      
      <!-- 缩写形式 -->
   ```
#### 21. __Vue中的插槽__
  `v-slot 指令自 Vue 2.6.0 起被引入`
  插槽是子组件提供给父组件使用的一个占位符，用，父组件可以在这个占位符中填充任何模板代码，如html，组件等，填充的内容会替换子组件中的slot标签。
   * 具名插槽
  具名插槽就是为插槽命名，一个子组件中可以有多个插槽，父组件在填充内容时，可以根据名字将内容填充到对应的插槽中。
  子组件：
   ```html
      <template>
          <div>
              <slot name="left"></slot>
              <slot name="right"></slot>
          </div>
      </template>
   ```
   父组件：
   ```html
      <组件名>
          <template v-slot:left>
              <div>左边内容。。。</div>
          </template>
          <template v-slot:right>
              <div>右边内容。。。</div>
          </template>
      </组件名>
   ```
   * 默认插槽
      就是没有`name`属性的插槽
       * 父级的填充内容如果指定到子组件的没有对应名字插槽，那么该内容不会被填充到默认插槽中。
       * 如果子组件没有默认插槽，而父级的填充内容指定到默认插槽中，那么该内容就“不会”填充到子组件的任何一个插槽中。
       * 如果子组件有多个默认插槽，而父组件所有指定到默认插槽的填充内容，将 __全部__ 填充到子组件的每个默认插槽中。      
   * 作用域插槽
      即带参数的插槽，子组件提供给父组件的参数，只能在插槽内使用
      子组件：
       ```html
          <template>
              <div>
                  <slot name="left" :age='18'></slot>
                  <slot name="right"></slot>
              </div>
          </template>
       ```
       父组件：
       ```html
          <组件名>
              <template v-slot:left='随便起名 比如 data'>
                  <div>左边内容。。。{{上面的名字.属性名  data.age}}</div>  
                  <!-- 传过来的18 -->
              </template>
              <template v-slot:right>
                  <div>右边内容。。。</div>
              </template>
          </组件名>
       ```
#### 22. __Vue-router导航守卫__
首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能调整页面的重定向功能。

beforeEach主要有3个参数to，from，next：

to：route即将进入的目标路由对象，

from：route当前导航正要离开的路由

next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。
#### 23. __diff算法__
Diff算法的作用是用来计算出 Virtual DOM 中被改变的部分，然后针对该部分进行原生DOM操作，而不用重新渲染整个页面。采用双端比较，同时从新旧节点的头尾进行比较，通过key可以找到可以复用的节点，减少计算。
#### 24. __vue中router和route的区别__
##### $route对象
  $route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
  * $route.path 字符串，对应当前路由的路径，总是解析为绝对路径，如"/foo/bar"。
  * $route.params 一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象。
  * \$route.query 一个 key/value 对象，表示 URL 查询参数。 例如，对于路径 /foo?user=1，则有$route.query.user == 1,如果没有查询参数，则是个空对象。
  * $route.hash 当前路由的hash值 (不带#) ，如果没有 hash 值，则为空字符串。锚点*
  * \$route.fullPath 完成解析后的 URL，包含查询参数和hash的完整路径。
  * \$route.matched 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
  *  \$route\. name 当前路径名字
  *  \$route.meta  路由元信息
##### $router对象
  $router对象是全局路由的实例，是router构造方法的实例。
   
  路由实例方法：
  * push  跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。
  * go  页面路由跳转 在 history 记录中前进或者后退  //this\. \$router.go(-1) 
  * replace   push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，不会向 history 栈添加一个新的记录
  * 一般使用replace来做404页面
#### 25. __v-for中为什么加key__

  我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

  key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两 个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少DOM操作量，提高性能。
#### 26. __Vue2和Vue3的区别__
  1. __默认进行懒观察（lazy observation）__
    在 2.x 版本里，不管数据多大，都会在一开始就为其创建观察者。当数据很大时，这可能会在页面载入时造成明显的性能压力。3.x 版本，只会对「被用于渲染初始可见部分的数据」创建观察者，而且 3.x 的观察者更高效。
  2. __更精准的变更通知。__
    举例来说：2.x 版本中，使用 Vue.set 来给对象新增一个属性时，这个对象的所有 watcher 都会重新运行；3.x 版本中，只有依赖那个属性的 watcher 才会重新运行。 
  3. __3.0 新加入了 TypeScript 以及 PWA 的支持__
  4. __默认项目目录结构也发生了变化__
  5. __使用上的变化__
  * 取消了烦人的this
  * Data 
  * Method
  ```js
    export default {
      setup(){
        const name = reactive({
          name:'王'
        })
        const count=ref(0)
        const increamt=()=>{
          count.value++
        }
        return {name,count,increamt}
    }  
  ```
  * 生命周期
    beforeCreate -> 请使用 setup()
    created -> 请使用 setup()
    beforeMount -> onBeforeMount
    mounted -> onMounted
    beforeUpdate -> onBeforeUpdate
    updated -> onUpdated
    beforeDestroy -> onBeforeUnmount
    destroyed -> onUnmounted
    errorCaptured -> onErrorCaptured

#### 27. Vue如何自定义指令
  注册一个自定义指令有全局注册与局部注册
  全局注册注册主要是用过`Vue.directive`方法进行注册

  `Vue.directive`第一个参数是指令的名字（不需要写上v-前缀），第二个参数可以是对象数据，也可以是一个指令函数

#### 28. Mixin 混入
  使用时 Mixins: [ 混入内容 ]
  

#### 27. __未完待续······__