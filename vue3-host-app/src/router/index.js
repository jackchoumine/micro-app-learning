/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:23:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 09:20:36
 * @Description :
 */
import { createRouter, createWebHistory } from 'vue-router'

const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  {
    // BUG 没有匹配到 /host/product
    path: '/react-app/:anyPath*',
    name: 'react-app',
    component: () => import('../views/HostPage.vue'),
  },
  { path: '/vue-app', component: () => import('../views/About.vue') },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(), //createWebHashHistory(),
  routes,
  // strict: true, // applies to all routes
})
