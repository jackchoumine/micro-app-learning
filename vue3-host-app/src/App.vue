<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 15:38:45
 * @Description : 
-->
<script setup>
import Layout from './components/Layout.vue'

// 在执行 microApp.start() 后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
</script>

<template>
  <div class="host-app">
    <Layout />
  </div>
</template>

<style scoped>
.host-app {
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
}
</style>
