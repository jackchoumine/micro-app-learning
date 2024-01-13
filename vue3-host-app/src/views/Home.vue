<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:24:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 02:13:22
 * @Description : 
-->
<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import { useLocalStorage } from '../hooks';
// 在执行microApp.start()后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
// const dataFromReactApp = useLocalStorage('dataFromReactApp')
const [baseAge,removeBaseAge]= useLocalStorage('baseAge', 0)
console.log('baseAge', baseAge.value)
function onClick(){
  removeBaseAge()
}
</script>

<template>
  <div class="home-page">
    <div class="host-part">
      <HelloWorld msg="Vite + Vue" />
      <h2>vue host app</h2>
      <p>baseAge {{ baseAge }}</p>
      <button @click="onClick">移除 baseAge</button>
      <div>来自子应用react18-app的数据:</div>
      <!-- <p>{{dataFromReactApp }}</p> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
}
</style>
