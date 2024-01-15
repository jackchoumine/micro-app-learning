<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:49:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 22:44:07
 * @Description : 
-->
<script setup>
import microApp from '@micro-zoe/micro-app'
import {  onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useLocalStorage } from '../hooks'

const route = useRoute()
const [initPath] = useLocalStorage('initPath', location.pathname)

function sendDataTo(name, data) {
  // 向子应用react18-app传递数据
  microApp.setData(name, data, dataFromChild => {
    console.log('来自子应用react18-app的数据:', dataFromChild)
  })
}

// 监听子应用react18-app的数据变化
onMounted(onAppDataChange)

function onAppDataChange(){
  microApp.addDataListener('react18-app', dataFromChild => {
    console.log('来自子应用react18-app的数据:', dataFromChild)
    initPath.value = dataFromChild.initPath
    return route.fullPath // 返回值会传递给子应用
  })
}
</script>

<template>
  <div class="host-page">
    <h3>this is react-app in Vue component {{ initPath }}</h3>
    <!-- @mounted="onAppDataChange" -->
    <micro-app
      name="react18-app"
      url="http://localhost:3001/"
      baseroute="/host"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.host-page {
  // scss code
}
</style>
