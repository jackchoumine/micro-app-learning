<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 03:43:24
 * @Description : 
-->
<script setup>
import { onMounted, ref, watch } from 'vue';
import microApp from '@micro-zoe/micro-app'

import Layout from './components/Layout.vue'
import { useLocalStorage } from './hooks';
// 在执行 microApp.start() 后此值才会生效
console.log('vue3-host-app 是主应用吗', window.__MICRO_APP_BASE_APPLICATION__)

const [dataFromReactApp] = useLocalStorage('dataFromReactApp')

const [count] = useLocalStorage('baseCount', 0)

watch(count, (newVal) => {
  console.log('baseCount变化了', newVal)
  // 向子应用react18-app传递数据
  // microApp.setData('react18-app',{
  //   baseCount: newVal
  // },(dataFromChild)=>{
  //   console.log('来自子应用react18-app的数据:', dataFromChild)
  // })
  // console.log('向子应用react18-app传递数据:', newVal)
})

onMounted(() => {
  microApp.addDataListener('react18-app', (dataFromChild) => {
    console.log('来自子应用react18-app的数据:', dataFromChild)
    dataFromReactApp.value = dataFromChild
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
