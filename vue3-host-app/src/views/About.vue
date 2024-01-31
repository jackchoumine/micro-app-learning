<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:25:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-31 18:20:25
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

  const childData = microApp.getData('vue3-app')
  console.log('vue3-app的数据:', childData)
  microApp.addDataListener('vue3-app', dataFromChild => {
    console.log('vue3-app的数据:', dataFromChild)
    if (dataFromChild.toPath && dataFromChild.toPath !== route.fullPath) {
      router.push(dataFromChild.toPath)
    }
  })
}
function appMounted(e) {
  console.log('vue3-app mounted', e.detail)
  const appBody = e.detail.container.querySelector('micro-app-body')
  // work as well
  // const appBody = document
  //   .querySelector('micro-app[name="vue3-app"]')
  //   .querySelector('micro-app-body')
  console.log('vue3-app body', appBody)
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
      @mounted="appMounted"
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  // scss code
}
</style>
