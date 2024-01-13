<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-13 23:54:34
 * @Description : 
-->
<script setup>
import { onMounted, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Layout from './components/Layout.vue'
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
    <Layout />
  </div>
</template>

<style scoped>
.host-app {
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color:aliceblue;
}
</style>
