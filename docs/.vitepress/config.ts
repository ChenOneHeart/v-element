import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VC-UI组件库",
  description: "A VitePress Site",
  vite: {
    plugins: [
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  srcDir: "components",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/quick-start' }
    ],

    sidebar: [
      {
        text: '常规组件',
        items: [
          { text: '快速开始', link: '/quick-start' },
          { text: 'Button按钮', link: '/button' },
          { text: 'Icon图标', link: '/icon' },
          { text: 'Collapse折叠面板', link: '/collapse' },
          { text: 'Input输入框', link: '/input' },
        ]
      },
      {
        text: '数据展示',
        items: [
          { text: 'Collapse折叠面板', link: '/collapse' },
        ]
      },
      {
        text: '表单组件',
        items: [
          { text: 'Form 表单', link: '/form' },
          { text: 'Input 输入框', link: '/input' },
          { text: 'Switch 开关', link: '/switch' },
        ]
      },
      {
        text: '反馈组件',
        items: [
          { text: 'Message 消息提示', link: '/message' },
          { text: 'Tooltip 文字提示', link: '/tooltip' },
          { text: 'Modal 对话框', link: '/modal' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenoneheart/v-element' }
    ]
  }
})
