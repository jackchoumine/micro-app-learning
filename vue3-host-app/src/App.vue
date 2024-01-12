<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-12 10:54:19
 * @Description : 
-->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
// 在执行microApp.start()后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
</script>

<template>
  <div class="host-app">
    <HelloWorld msg="Vite + Vue" />
    <micro-app
      name="react18-app"
      url="http://localhost:3001/"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped>
.host-app {
  display: flex;
}
</style>
