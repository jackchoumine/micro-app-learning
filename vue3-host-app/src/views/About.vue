<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:25:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 12:15:16
 * @Description : 
-->
<script setup>
import microApp from '@micro-zoe/micro-app'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(onAppDataChange)

function onAppDataChange() {
  console.log('监听子应用的数据变化')
  microApp.addDataListener('vue3-app', dataFromChild => {
    console.log('vue3-app的数据:', dataFromChild)
    if (dataFromChild.toPath && dataFromChild.toPath !== route.fullPath) {
      router.push(dataFromChild.toPath)
    }
  })
}
</script>

<template>
  <div class="about-page">
    <h3>This is vue3-app in Vue component {{ initPath }}</h3>
    <micro-app
      name="vue3-app"
      url="http://localhost:3002/"
      baseroute="/vue3-app"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  // scss code
}
</style>
