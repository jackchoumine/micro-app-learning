<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:49:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 12:02:04
 * @Description : 
-->
<script setup>
import microApp from '@micro-zoe/micro-app'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    <micro-app
      name="react18-app"
      url="http://localhost:3001/"
      baseroute="/react18-app"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.host-page {
  // scss code
}
</style>
