<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:24:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 00:39:49
 * @Description : 
-->
<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import { useLocalStorage } from '../hooks';
// 在执行microApp.start()后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
const dataFromReactApp = useLocalStorage('dataFromReactApp')
</script>

<template>
  <div class="home-page">
    <div class="host-part">
      <HelloWorld msg="Vite + Vue" />
      <h2>vue host app</h2>
      <div>来自子应用react18-app的数据:</div>
      <p>{{dataFromReactApp }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
}
</style>
