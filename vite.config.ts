import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

export default defineConfig({
  server: {
    port: 80, // 设置开发服务器的端口号为80
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VcUi",
      fileName: "v-ui",
      
    }
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
