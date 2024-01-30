<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-12 17:36:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-30 10:52:23
 * @Description : about 页面
-->
<script setup>
const is_in_micro_app = window.__MICRO_APP_ENVIRONMENT__

function goToReactApp() {
  console.log('go to react18-app')
  // NOTE window.microApp.dispatch 数据没有发生变化，不会触发基座应用的监听回调
  // window.microApp.dispatch(
  window.microApp.forceDispatch(
    {
      from: 'vue3-app',
      toPath: '/react18-app/about',
    },
    () => {
      console.log('发送成功')
    }
  )
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button v-if="is_in_micro_app" @click="goToReactApp">go to react18-app/about</button>
    <el-button type="primary">el 按钮</el-button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* place-items: center; */
  }
}
</style>
