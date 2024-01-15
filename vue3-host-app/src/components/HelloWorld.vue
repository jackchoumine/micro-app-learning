<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 23:28:12
 * @Description : 
-->
<script setup>
import { useLocalStorage } from "../hooks";
import { sendDataTo } from '../tools'

defineProps({
  msg: String,
})

const [count,remove] = useLocalStorage('baseCount', 0)

function increment() {
  count.value++
  sendDataTo('react18-app',{
    baseCount: count.value
  },(dataFromChild)=>{
    console.log('来自子应用react18-app的数据:', dataFromChild)
  })
}

function decrement() {
  count.value--
  sendDataTo('react18-app',{
    baseCount: count.value
  },(dataFromChild)=>{
    console.log('来自子应用react18-app的数据:', dataFromChild)
  })
}

</script>

<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    <div class="card">
      <button type="button" @click="decrement">-</button>
      <span>{{count}}</span>
      <button type="button" @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
.hello-world {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: antiquewhite; */
  span {
    margin: 0 10px;
  }
}
</style>
