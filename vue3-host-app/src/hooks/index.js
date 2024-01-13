/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:57:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 02:39:51
 * @Description :
 */
import { customRef, nextTick } from 'vue'
// import { createGlobalState } from '@vueuse/core'

export const useLocalStorage = localStorage()

function _useLocalStorage(key, initialValue = null) {
  const refValue = customRef((track, trigger) => {
    return {
      // 获取数据值
      get: () => {
        track()
        let val = null
        try {
          val = JSON.parse(window.localStorage.getItem(key))
          // return val
        } catch (error) {
          //   return null
        }
        if (val) return val
        const strValue = JSON.stringify(initialValue)
        // 把初始化的值存进去
        window.localStorage.setItem(key, strValue)
        return initialValue
      },
      // 监听数据变化
      set: newVal => {
        console.log('set', newVal)
        trigger()
        const strValue = JSON.stringify(newVal)
        // console.log('set', newVal, strValue)
        window.localStorage.setItem(key, strValue)
      },
    }
  })
  return refValue
}

function localStorage() {
  const map = new Map()

  function removeItem(key) {
    if (!key) return false
    if (!map.has(key)) return false
    const [state] = map.get(key)
    state.value = null
    map.delete(key)
    nextTick(() => {
      window.localStorage.removeItem(key)
    })
    return true
  }

  return (key, initialValue) => {
    if (!map.has(key)) {
      const state = _useLocalStorage(key, initialValue)
      const remove = () => removeItem(key)
      map.set(key, [state, remove])
      return [state, remove]
    }
    return map.get(key)
  }
}
