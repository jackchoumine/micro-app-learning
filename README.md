# micro-app-learning

micro-app 学习

## 路由导航

子应用集成到基座和单独部署，导航体验都要一致，就要实现基座应用和子应用能相互控制路由，具体表现为：

1. 用户切换基座应用的路由，子应用也会跟着切换路由
2. 用户切换子应用的路由，基座应用也会跟着切换路由
3. 用户在子应用A中切换到子应用B，通过第二种方式实现

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

> micro-app 会遍历新旧值中的每个 key，判断值是否有变化（注意：**只会遍历第一层key**），无变化则不会发送，有变化则将新旧值进行合并后发送。

两种解决方案：

1. 在发送数据时，添加一个变化的key，比如 `__forceUpdate` ，这样就能保证数据每次都会变化，从而触发基座应用的监听回调

2. 使用 `forceDispatch` 方法，该方法会强制发送数据，不会判断数据是否发生变化
