<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:49:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 10:54:55
 * @Description : 
-->
<script setup>
//
</script>

<template>
  <div class="host-page">
    <h3>this is react-app in Vue component</h3>
    <micro-app
      name="react18-app"
      url="http://localhost:3001/"
      baseroute="/host"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.host-page {
  // scss code
}
</style>
