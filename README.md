# micro-app-learning

micro-app 学习

## 路由导航

子应用集成到基座和单独部署，导航体验都要一致，就要实现基座应用和子应用能相互控制路由，具体表现为：

1. 用户切换基座应用的路由，子应用也会跟着切换路由
2. 用户切换子应用的路由，基座应用也会跟着切换路由

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
