/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-11 17:16:24
 * @Description :
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import microApp from '@micro-zoe/micro-app'

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

createApp(App).mount('#app')
