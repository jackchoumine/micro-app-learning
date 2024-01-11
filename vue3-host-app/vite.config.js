/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-11 16:51:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-11 17:01:10
 * @Description : vite 配置文件
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['micro-app'].includes(tag),
        },
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
})
