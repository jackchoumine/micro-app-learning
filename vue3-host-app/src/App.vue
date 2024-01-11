<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-11 17:27:49
 * @Description : 
-->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
// 在执行microApp.start()后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <micro-app
    name="react18-app"
    url="http://localhost:3001/"
    iframe
    disable-memory-router></micro-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
