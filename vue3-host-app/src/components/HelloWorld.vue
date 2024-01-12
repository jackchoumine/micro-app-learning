<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-12 10:50:40
 * @Description : 
-->
<script setup>
import { ref } from 'vue'
import microApp from '@micro-zoe/micro-app'

defineProps({
  msg: String,
})

const count = ref(0)

function increment() {
  count.value++
  microApp.setData('react18-app',{
    count: count.value
  })
}
</script>

<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="increment">count is {{ count }}</button>
    </div>
  </div>
</template>

<style scoped>
.hello-world {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: antiquewhite;
}
</style>
