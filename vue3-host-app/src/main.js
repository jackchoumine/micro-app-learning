/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-13 23:26:36
 * @Description :
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import microApp from '@micro-zoe/micro-app'

import { router } from './router'

microApp.start({
  lifeCycles: {
    created(e) {
      console.log('created')
    },
    beforemount(e) {
      console.log('beforemount')
    },
    mounted(e) {
      console.log('mounted')
    },
    unmount(e) {
      console.log('unmount')
    },
    error(e) {
      console.log('error')
    },
  },
})

/**
 * 应用渲染时执行
 * @param data 初始化数据
 */
window.onmount = data => {
  // FIXME 没有执行
  console.log('子应用已经渲染', data)
}

// 5. 使用路由实例挂载应用程序。
createApp(App).use(router).mount('#app')
