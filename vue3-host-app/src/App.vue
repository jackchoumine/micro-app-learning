<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-12 18:04:55
 * @Description : 
-->
<script setup>
import { onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import microApp from '@micro-zoe/micro-app'
// 在执行microApp.start()后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)
const dataFromChild = ref(null)
onMounted(() => {
  console.log('vue3-host-app onMounted')
  microApp.addDataListener('react18-app', (_dataFromChild) => {
    console.log('来自子应用react18-app的数据:', _dataFromChild)
    dataFromChild.value = _dataFromChild
    return true // 返回值会传递给子应用
  })
})
</script>

<template>
  <div class="host-app">
    <div class="part-1">
      <div class="host-part">
        <HelloWorld msg="Vite + Vue" />
        <h2>vue host app</h2>
        <div>来自子应用react18-app的数据:</div>
        <p>{{dataFromChild}}</p>
      </div>
      <micro-app
        name="react18-app"
        url="http://localhost:3001/"
        iframe
        disable-memory-router></micro-app>
    </div>
    <micro-app
      name="vue3-app"
      url="http://localhost:3002/"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped>
.host-app {
  display: flex;
  flex-direction: column;
  background-color:aliceblue;
}
.part-1{
  display: flex;
}
.host-part {
  display: flex;
  flex-direction: column;
}
</style>
