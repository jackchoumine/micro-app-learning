<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 22:56:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-13 23:55:48
 * @Description : 
-->
<script setup>
// TODO
</script>

<template>
  <div class="layout">
    <nav>
      <!-- 导航栏 -->
      <router-link to="/">Home</router-link>
      <router-link to="/host">host</router-link>
      <router-link to="/about">About</router-link>
      <p>nav in host app</p>
    </nav>
    <main>
      <!-- 主体内容 -->
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  height: 100vh;

  nav {
    border-right: 1px solid #35495e;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }

  a {
    color: #35495e;
    text-decoration: none;
    width: 100px;
    margin: 0 10px;
  }

  :deep(a.router-link-active) {
    color: #42b983;
    text-decoration: underline;
  }
}
</style>
