/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-13 23:57:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-14 00:53:51
 * @Description :
 */
import { customRef } from 'vue'

export function useLocalStorage(key, initialValue = null) {
  const refValue = customRef((track, trigger) => {
    return {
      // 获取数据值
      get: () => {
        track()
        let val = null
        try {
          val = JSON.parse(localStorage.getItem(key))
          // return val
        } catch (error) {
          //   return null
        }
        if (val) return val
        const strValue = JSON.stringify(initialValue)
        // 把初始化的值存进去
        localStorage.setItem(key, strValue)
        return initialValue
      },
      // 监听数据变化
      set: newVal => {
        trigger()
        const strValue = JSON.stringify(newVal)
        // console.log('set', newVal, strValue)
        localStorage.setItem(key, strValue)
      },
    }
  })
  return refValue
}
