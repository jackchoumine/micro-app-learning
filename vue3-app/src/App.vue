<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-12 17:36:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-24 18:20:09
 * @Description : 
-->
<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { useTheme } from '@/hooks'

import HelloWorld from './components/HelloWorld.vue'

const { ThemeToggle, themeVal } = useTheme()

const router = useRouter()

addDataListener()

function addDataListener() {
  if (window.__MICRO_APP_NAME__ === 'vue3-app') {
    // 监听来自主应用的数据变化
    // NOTE microApp.addDataListener 不生效
    window.microApp.addDataListener(data => {
      console.log('vue3-app 收到数据', data)
      const path =
        data.__base_app_to_path.replace(window.__MICRO_APP_BASE_ROUTE__, '') || '/'
      console.log('vue3-app 跳转', path)
      router.push({
        path,
      })
      // 返回值将传递给主应用
      return {
        success: true,
        msg: Math.random(),
        microAppName: window.__MICRO_APP_NAME__,
      }
    })
  }
}
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <h3>静态资源</h3>
    <img src="@/assets/ma-yun.jpg" alt="马云" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld :msg="themeVal" />
      <ThemeToggle />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  /* color: var(--color-text); */
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
