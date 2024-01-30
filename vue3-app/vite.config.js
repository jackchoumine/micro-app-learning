/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-12 17:36:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-30 11:14:09
 * @Description :
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { URL, fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
          directives: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // TODO 自定义主题，没有生效
        // https://blog.csdn.net/gsy445566778899/article/details/130843599
        // additionalData: `@use "@/assets/index.scss" as *;`,
      },
    },
  },
  server: {
    port: 3002,
    open: true,
  },
})
