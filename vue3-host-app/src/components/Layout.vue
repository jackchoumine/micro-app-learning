<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 22:56:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-16 11:42:45
 * @Description : 
-->
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

import { useLocalStorage } from '../hooks'
import { sendDataTo } from '../tools'

const [baseCount] = useLocalStorage('baseCount', 0)
const [baseAge] = useLocalStorage('baseAge')

const route = useRoute()
// const [initPath] = useLocalStorage('initPath', location.pathname)

watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    console.log('toPath', newVal)
    console.log('oldPath', oldVal)
    // initPath.value = newVal
    if (newVal !== oldVal) {
      sendDataTo('react18-app', {
        __base_app_to_path: newVal,
        __base_app_old_path: oldVal,
      })
      sendDataTo('vue3-app', {
        __base_app_to_path: newVal,
        __base_app_old_path: oldVal,
      })
    }
  }
)

function incrementAge() {
  baseAge.value++
  // 向子应用react18-app传递数据
  sendDataTo(
    'react18-app',
    {
      baseAge: baseAge.value,
    },
    dataFromChild => {
      console.log('来自子应用react18-app的数据:', dataFromChild)
    }
  )
  sendDataTo(
    'vue3-app',
    {
      baseAge: baseAge.value,
    },
    dataFromChild => {
      console.log('来自子应用vue-app的数据:', dataFromChild)
    }
  )
}
</script>

<template>
  <div class="layout">
    <nav>
      <!-- 导航栏 -->
      <div class="nav-container">
        <router-link to="/">home</router-link>
        <router-link to="/react18-app">react18-app</router-link>
        <router-link to="/react18-app/about">react18-app/about</router-link>
        <router-link to="/vue3-app">vue3-app</router-link>
        <router-link to="/vue3-app/about">vue3-app/about</router-link>
      </div>
      <div class="data-container">
        <p>nav in host app</p>
        <p>baseCount {{ baseCount }}</p>
        <p>baseAge {{ baseAge }} <button @click="incrementAge">baseAge +1</button></p>
      </div>
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
    margin: 0 10px;

    .nav-container {
      display: flex;
      flex-direction: column;
      /* height: 100px; */
      background-color: #fff;
    }

    .data-container {
      background-color: lightblue;
    }
  }

  a {
    color: #35495e;
    text-decoration: none;
    width: 100%;
    margin: 0 10px;
  }

  :deep(a.router-link-active) {
    color: #42b983;
    text-decoration: underline;
  }
}
</style>
