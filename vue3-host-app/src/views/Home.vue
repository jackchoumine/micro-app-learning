<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:24:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-13 23:51:15
 * @Description : 
-->
<script setup>
import { onMounted, ref } from 'vue';
import HelloWorld from '../components/HelloWorld.vue'
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
  <div class="home-page">
    <div class="host-part">
      <HelloWorld msg="Vite + Vue" />
      <h2>vue host app</h2>
      <div>来自子应用react18-app的数据:</div>
      <p>{{ dataFromChild }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
}
</style>
