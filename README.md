# micro-app-learning

micro-app 学习

## 工程目录

```bash
vue3-host-app # 基座应用
react18-app # react 子应用
vue3-app # vue 子应用
```

各个应用都有自己的导航路由。

## 数据通信

应用之间要共享一些数据，比如：用户信息、权限信息等，就要实现应用之间的数据通信。三种通信场景：

1. 基座应用向子应用传递数据
2. 子应用向基座应用传递数据
3. 子应用之间传递数据

### 基座应用向子应用传递数据

> 手动发送 -- 推荐

```js
import microApp from '@micro-zoe/micro-app'
// 向子应用传递数据 setData(appName, data, afterSend) data 为对象 afterSend 为发送结束后的回调, 可选
microApp.setData('react18-app', {
    type: '新的数据'
}, (childData) => {
    console.log('发送结束，收到子应用反馈 childData', childData)
})
```

> 第二个参数为传递的数据，它发送的数据都会被缓存下来。

> micro-app 会遍历新旧值中的每个 key（**只会遍历第一层 key**），判断值是否有变化，无变化则不会发送（注意：），有变化则将新旧值进行合并后发送。

> 无变化时也想要发送，如何办呢？

```js
// 1. 使用 forceSetData 方法，该方法会强制发送数据，不会判断数据是否发生变化。
microApp.forceSetData('my-app', {
    name: 'jack'
}, () => {
    console.log('数据已经发送完成')
})
// 2. 在发送数据时，添加一个变化的 key，比如 __forceUpdate。
microApp.setData('my-app', {
    name: 'jack'
    __forceUpdate: Date.now(),
}, () => {
    console.log('数据已经发送完成')
})
```

基座应用向子应用传递数据的其他方式：

1.  使用 `micro-app` 标签的 `data` 绑定数据。

```html
<micro-app name="vue3-app" url="http://localhost:3001/" baseroute="/vue3-app" iframe disable-memory-router :data="dataFromBase"></micro-app>
```

> 哪种方式更好呢？

`microApp.setData()` 更好，开发者可以完全控制。
`data` 属性绑定，适合传递一些静态数据。

#### 子应用监听数据变化

```js
// NOTE microApp.addDataListener 不生效
window.microApp.addDataListener(data => {
    console.log('react18-app 收到数据', data)
    // 返回值将传递给主应用，作为 microApp.setData 的回调函数的参数
    return {
        success: true,
        msg: Math.random(),
        microAppName: window.__MICRO_APP_NAME__,
    }
})
```

子应用获取基座应用的数据的其他方式：

1. 直接获取：

```js
const data = window.microApp.getData() // 返回主应用下发的data数据
```

> 哪种方式更好呢？

`window.microApp.addDataListener` 更好，开发者可以完全控制。
`window.microApp.getData()` 常用来获取已经缓存数据，无需等待基座应用发送数据，获取不常变化的静态配置更适合。

### 子应用向基座应用传递数据

```js
// 向主应用传递数据 dispatch(data, afterSend) data 为对象  afterSend 为发送结束后的回调, 可选
// NOTE microApp.dispatch 不生效
window.microApp.dispatch({
    type: '子应用发送给主应用的数据'
}, (dataFromBase) => {
    console.log('子应用发送数据给主应用结束，收到反馈 dataFromBase ', dataFromBase)
})
```

> dispatch 是异步执行的，多个 dispatch 会在下一帧合并为一次执行。

> micro-app 会遍历新旧值中的每个 key（**只会遍历第一层 key**），判断值是否有变化，无变化则不会发送，有变化则将新旧值进行合并后发送。

> 无变化时也想要发送，如何办呢？

两种解决方案：

1. 在发送数据时，添加一个变化的 key，比如 `__forceUpdate`。
2. 使用 `forceDispatch` 方法，该方法会强制发送数据，不会判断数据是否发生变化。

#### 基座应用监听数据变化

```js
function onAppDataChange() {
    console.log('监听子来自应用的数据变化')
    microApp.addDataListener('vue3-app', dataFromChild => {
        console.log('vue3-app的数据:', dataFromChild)
        if (dataFromChild.toPath && dataFromChild.toPath !== route.fullPath) {
            router.push(dataFromChild.toPath)
        }
        // 返回值将传递给子应用，作为 window.microApp.dispatch 的回调函数的参数
        return 'ok'
    })
}
```

> 基座应用获取子应用发送的数据的其他方式：

1. 直接获取：

```js
import microApp from '@micro-zoe/micro-app'
// appName 为子应用名称
const childData = microApp.getData(appName)

```

2. 在`micro-app`标签上监听`datachange`事件：
   数据在事件对象的`detail.data`字段中，子应用每次发送数据都会触发 datachange。

```html
<micro-app
   name='my-app'
   url='xx'
   @datachange='handleDataChange'
 />
```

> 哪种方式更好呢？

`microApp.addDataListener` 更好，更加灵活，可以在监听函数中做更多的事情。
`microApp.getData(appName)` 常用来获取缓存数据，无需等待子应用发送数据，获取静态数据更适合。

### 子应用之间传递数据

通过基座应用进行数据通信，基座应用作为中介，子应用之间不直接通信。
或者通过全局数据通信，子应用之间共享数据。

### 数据清空和解除事件绑定

[数据清空](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/data?id=%e4%ba%94%e3%80%81%e6%b8%85%e7%a9%ba%e6%95%b0%e6%8d%ae)

### 全局数据通信

#### 基座应用接收和发送数据

> 基座应用发送数据

```js
import microApp from '@micro-zoe/micro-app'
// setGlobalData只接受对象作为参数
microApp.setGlobalData({
    type: '全局数据'
}, (dataArr) => {
    // dataArr 是一个数组，包含了所有 addGlobalDataListener 返回的数据
    console.log('发送结束收到反馈，dataArr 是一个数组', dataArr)
    // ['返回值1', '返回值2']
})
```

> 基座应用接收数据

```js
microApp.addGlobalDataListener((data) => {
    console.log('全局数据', data)
    return '返回值1'
})
/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
microApp.addGlobalDataListener((data) => {
    console.log('全局数据', data)
    return '返回值2'
}, true)
```

> 基座应用直接获取全局数据

```js
// 直接获取数据
const globalData = microApp.getGlobalData() // 返回全局数据
```

#### 基座应用清除全局数据

```js
import microApp from '@micro-zoe/micro-app'

// 清空全局数据
microApp.clearGlobalData()
```

### 子应用接收和发送数据

> 子应用发送数据

```js
// setGlobalData只接受对象作为参数
// 返回值会放入数组中传递给setGlobalData的回调函数
window.microApp.setGlobalData({
    city: 'HK'
}, (res: any[]) => {
    console.log(res) // ['返回值1', '返回值2']
})
```

> 子应用接收数据

```js
// 直接获取数据
const globalData = window.microApp.getGlobalData() // 返回全局数据
```

```js
window.microApp.addGlobalDataListener((data) => {
    console.log('全局数据', data)
    return '返回值1'
})
/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
 */
window.microApp.addGlobalDataListener((data) => {
    console.log('全局数据', data)
    return '返回值2'
}, true)
```

### 子应用清除全局数据

```js
// 清空全局数据
window.microApp.clearGlobalData()
```

## 路由导航

子应用集成到基座和单独部署，导航体验都要一致，就要实现基座应用和子应用能相互控制路由，具体表现为：

1. 用户切换基座应用的路由，子应用也会跟着切换路由
2. 用户切换子应用的路由，基座应用也会跟着切换路由
3. 用户在子应用 A 中切换到子应用 B，通过第二种方式实现
   基于应用之间的**数据通信**，实现路由相互控制。

### 基座应用控制子应用路由

> 在基座应用的 `micro-app` 标签上和子应用的路由配置中设置子应用根路由：

基座应用设置子应用路由 `baseroute` ：
react 子应用的路由配置：
引入处的路由配置：

```html
<micro-app name="react18-app" url="http://localhost:3001/" baseroute="/react18-app" iframe disable-memory-router></micro-app>
```

```jsx
// __MICRO_APP_BASE_ROUTE__ 就是 micro-app 标签上的 baseroute 属性值
<BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || ''}>
   <App />
</BrowserRouter>
```

vue 子应用的路由配置也是类似的：
引入处的路由配置：

```html
<micro-app name="vue3-app" url="http://localhost:3002/" baseroute="/vue3-app" iframe disable-memory-router></micro-app>
```

```js
// __MICRO_APP_BASE_ROUTE__ 就是 micro-app 标签上的 baseroute 属性值
const router = createRouter({
    history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ ||
        import.meta.env.BASE_URL),
})
```

基本思路：

1. 基座应用监听路由变化，当路由变化时，通知子应用切换路由

> 在基座应用菜单组件

```js
import {
    watch
} from 'vue'
import {
    useRoute
} from 'vue-router'
import microApp from '@micro-zoe/micro-app'
const route = useRoute()
watch(
    () => route.fullPath,
    (newVal, oldVal) => {
        console.log('route.fullPath', newVal, oldVal)
        if (newVal !== oldVal) {
            // 通知子应用切换路由
            sendDataTo('react18-app', {
                __base_app_to_path: newVal,
                __base_app_old_path: oldVal,
            })
            sendDataTo('vue3-app', {
                __base_app_to_path: newVal,
                __base_app_old_path: oldVal,
            })
        }
    }
)

function sendDataTo(appName, data, afterSend) {
    // 向子应用传递数据
    microApp.setData(appName, data, afterSend)
}
```

> 子应用接收数据，进行路由切换

react 子应用

```jsx
import { NavLink, Route, Routes,  useNavigate } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Product from './pages/Product'
function App() {
  const navigate = useNavigate()
  if (window.__MICRO_APP_NAME__ === 'react18-app') {
    // 监听来自主应用的通信
    // NOTE microApp.addDataListener 不生效
    window.microApp.addDataListener(data => {
      console.log('react18-app 收到数据', data)
      // 订阅基座应用路由变化，更新当前应用路由
       const path =
        data.__base_app_to_path.replace(window.__MICRO_APP_BASE_ROUTE__, '')
      navigate(path)
    })
  }
  return (
    <div className="react18-app">
      <h1>Vite + React</h1>
      <nav>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/product">产品</NavLink>
        <NavLink to="/about">关于</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
export default App
```

vue 子应用

```js
import {
    useRouter
} from 'vue-router'
const router = useRouter()
addDataListener()

function addDataListener() {
    if (window.__MICRO_APP_NAME__ === 'vue3-app') {
        // 监听来自主应用的数据变化
        // NOTE microApp.addDataListener 不生效
        window.microApp.addDataListener(data => {
            console.log('vue3-app 收到数据', data)
            // NOTE vue-router '' 路径不会匹配 '/'，所以要处理一下
            const path =
                data.__base_app_to_path.replace(window.__MICRO_APP_BASE_ROUTE__, '') || '/'
            router.push({
                path,
            })
        })
    }
}
```

2. 子应用控制基座应用路由

基本思路：需要基座应用改变路由的时候，子应用通知基座应用切换路由

> 基座应用监听子应用发送的通知，在子应用的路由跳转时，通知基座应用切换路由

vue 基座

```html
<script setup>
    import microApp from '@micro-zoe/micro-app'
    import {
        onMounted
    } from 'vue'
    import {
        useRoute,
        useRouter
    } from 'vue-router'
    const route = useRoute()
    const router = useRouter()
    // 监听子应用react18-app的数据变化
    onMounted(onAppDataChange)

    function onAppDataChange() {
        microApp.addDataListener('react18-app', dataFromChild => {
            console.log('来自子应用react18-app的数据:', dataFromChild)
            if (dataFromChild.toPath && dataFromChild.toPath !== route.fullPath) {
                router.push(dataFromChild.toPath)
            }
        })
    }
</script>
<template>
    <div class="host-page">
        <h3>this is react18-app in Vue component</h3>
        <!-- @mounted="onAppDataChange" -->
        <micro-app name="react18-app" url="http://localhost:3001/" baseroute="/react18-app" iframe disable-memory-router></micro-app>
    </div>
</template>
```

react 子应用

```jsx
const Product = () => {
  // 向基座应用发送通知，切换路由
  function goBaseHome() {
    sendDataToBase()
  }
  function sendDataToBase() {
    window.microApp.dispatch(
      {
        from: 'react18-app',
        toPath: '/',
        // 确保数据发生变化，否则不会发送
         __forceUpdate: Date.now(),
      },
      () => {
        console.log('发送成功')
      }
    )
  }
  return (
    <div>
      <h1>Product Page</h1>
      {window.__MICRO_APP_ENVIRONMENT__ ? (
        <button onClick={goBaseHome} type="primary">
          go to base home
        </button>
      ) : null}
    </div>
  )
}
export default Product
```

vue 子应用

```html
<script setup>
    const is_in_micro_app = window.__MICRO_APP_ENVIRONMENT__

    function goToReactApp() {
        console.log('go to react18-app')
        // NOTE window.microApp.dispatch 数据没有发生变化，不会触发基座应用的监听回调
        // window.microApp.dispatch(
        window.microApp.forceDispatch({
                from: 'vue3-app',
                toPath: '/react18-app/about',
            },
            () => {
                console.log('发送成功')
            }
        )
    }
</script>
<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button v-if="is_in_micro_app" @click="goToReactApp">
            go to react18-app
        </button>
    </div>
</template>
```
