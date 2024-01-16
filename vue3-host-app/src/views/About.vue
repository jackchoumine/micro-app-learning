<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:25:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 11:34:16
 * @Description : 
-->
<script setup>
// import { useLocalStorage } from '../hooks'

// const [initPath] = useLocalStorage('initPath', location.pathname)
</script>

<template>
  <div class="about-page">
    <h3>This is vue3-app in Vue component {{ initPath }}</h3>
    <micro-app
      name="vue3-app"
      url="http://localhost:3002/"
      baseroute="/vue3-app"
      iframe
      disable-memory-router></micro-app>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  // scss code
}
</style>
