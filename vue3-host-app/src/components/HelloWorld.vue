<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 03:32:16
 * @Description : 
-->
<script setup>
import microApp from '@micro-zoe/micro-app'
import { useLocalStorage } from "../hooks";

defineProps({
  msg: String,
})

const [count,remove] = useLocalStorage('baseCount', 0)

function increment() {
  // console.log('count.value', count.value)
  count.value++
  // 向子应用react18-app传递数据
  microApp.setData('react18-app',{
    baseCount: count.value
  },(dataFromChild)=>{
    console.log('来自子应用react18-app的数据:', dataFromChild)
  })
  console.log('向子应用react18-app传递数据:', count.value)
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
  /* background-color: antiquewhite; */
}
</style>
