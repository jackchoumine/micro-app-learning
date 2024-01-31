/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-12 17:36:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-31 17:42:11
 * @Description :
 */
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
// Import Quasar css
import 'quasar/dist/quasar.css'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/main.css'
import quasarOptions from './quasar.options'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(Quasar, quasarOptions)

app.mount('#vue3-app')
