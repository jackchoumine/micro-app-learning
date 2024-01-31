/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-24 17:34:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-31 18:26:03
 * @Description :
 */
import { defineComponent, readonly, ref, watch } from 'vue'

export function useTheme(
  initTheme: string = window.localStorage.getItem('theme') || 'normal'
) {
  const themeVal = ref(initTheme)
  // 监听主题变化
  watch(
    themeVal,
    (val, oldVal) => {
      console.log('val', val, oldVal)
      // oldVal && document.body.classList.remove(oldVal as string)
      let body = document.body
      // @ts-ignore
      if (window.__MICRO_APP_NAME__ === 'vue3-app') {
        // console.log('vue3-app', document.querySelector('.about-page'))
        console.log('vue3-app', body.querySelector('#app'))
        // body = document.querySelector('micro-app')
        // body = document.querySelector("micro-app[name='vue3-app']")
        // .querySelector('micro-app-body') as HTMLElement
      }
      console.log('body', body)
      const classList = body.classList
      if (classList.contains(oldVal as string)) {
        classList.remove(oldVal as string)
        // classList.remove('normal')
        // classList.remove('tech')
      }
      document.body.classList.add(val)
    }
    // {
    //   immediate: true,
    // }
  )

  const ThemeToggle = defineComponent((props, { emit }) => {
    const _themeVal = ref(props.value || themeVal.value)
    function onChange(value: string) {
      _themeVal.value = value
      themeVal.value = value
      window.localStorage.setItem('theme', value)
      emit('update:value', value)
    }
    return () => (
      <div>
        <h2>切换主题</h2>
        <label for="normal"> 正常 </label>
        <input
          type="radio"
          name="themeToggle"
          id="normal"
          value="normal"
          checked={_themeVal.value === 'normal'}
          onChange={() => onChange('normal')}
        />
        <br />
        <label for="tech"> 科技 </label>
        <input
          type="radio"
          name="themeToggle"
          id="tech"
          value="tech"
          checked={_themeVal.value === 'tech'}
          onChange={() => onChange('tech')}
        />
      </div>
    )
  })

  ThemeToggle.name = 'ThemeToggle'
  ThemeToggle.props = {
    value: {
      type: String,
      default: '',
    },
  }
  ThemeToggle.emits = ['update:value']

  return {
    themeVal: readonly(themeVal),
    toggleTheme,
    ThemeToggle,
  }

  function toggleTheme() {
    const newTheme = themeVal.value === 'normal' ? 'tech' : 'normal'
    themeVal.value = newTheme
    window.localStorage.setItem('theme', newTheme)
  }
}
