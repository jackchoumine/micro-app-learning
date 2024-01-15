<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:49:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 17:50:45
 * @Description : 
-->
<script setup>
import microApp from '@micro-zoe/micro-app'
import { nextTick, onMounted, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLocalStorage } from '../hooks'

const router = useRouter()
const route = useRoute()

watch(
  () => route.fullPath,
  val => {
    console.log('route.fullPath', val)
    sendDataTo('react18-app', {
      initPath: route.fullPath,
    })
  },
  {
    immediate: true,
  }
)

const [initPath] = useLocalStorage('initPath', location.pathname)

function sendDataTo(name, data) {
  // 向子应用react18-app传递数据
  microApp.setData(name, data, dataFromChild => {
    console.log('来自子应用react18-app的数据:', dataFromChild)
  })
}
function appMounted() {
  console.log('react18-app mounted')
  const microAppDom = document.querySelector('micro-app[name="react18-app"]')
  console.log('microAppDom', microAppDom)
  // const initPath =
  microApp.router.push({
    name: 'react18-app',
    path: initPath.value,
    replace: true,
  })
  const childAppPath = decodeURIComponent(initPath.value.slice(5))
  router.push({
    name: 'host',
    params: {
      anyPath: childAppPath,
    },
    // path: initPath.value,
  })
}

onMounted(() => {
  microApp.addDataListener('react18-app', dataFromChild => {
    console.log('来自子应用react18-app的数据:', dataFromChild)
    initPath.value = dataFromChild.initPath
    return route.fullPath // 返回值会传递给子应用
  })
})
</script>

<template>
  <div class="host-page">
    <h3>this is react-app in Vue component {{ initPath }}</h3>
    <micro-app
      name="react18-app"
      url="http://localhost:3001/"
      baseroute="/host"
      iframe
      @mounted="appMounted"
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.host-page {
  // scss code
}
</style>
