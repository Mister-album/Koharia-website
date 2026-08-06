import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import ElementPlus from 'unplugin-element-plus/vite'
import { defineConfig, loadEnv } from 'vitepress'

import { createHeadConfig } from './config/headConfig'
import { createThemeConfig } from './config/themeConfig'

const env = loadEnv('', process.cwd())
const hostname: string = env.VITE_HOSTNAME || 'https://koharia.org'

export default defineConfig({
  outDir: '../dist',
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: [
    'changelogs/**',
    'docs/**',
    'download/**',
    'extensions/**',
    'forks/**',
    'news/**',
    'privacy/**',
    'sandbox/**',
  ],
  sitemap: {
    hostname,
  },
  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Koharia',
      description: '面向 Komga 服务器的 Android 阅读器。',
      head: createHeadConfig('zh'),
      themeConfig: createThemeConfig('zh'),
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Koharia',
      description: 'An Android reader built for your Komga server.',
      head: createHeadConfig('en'),
      themeConfig: createThemeConfig('en'),
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomNavBarMenu.vue', import.meta.url),
          ),
        },
        {
          find: /^.*VPNavScreenMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomNavScreenMenu.vue', import.meta.url),
          ),
        },
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/CustomSwitchAppearance.vue', import.meta.url),
          ),
        },
      ],
    },
    plugins: [ElementPlus({})],
    ssr: {
      noExternal: ['element-plus'],
    },
  },
})
