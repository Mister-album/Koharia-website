import type { HeadConfig } from 'vitepress'

export function createHeadConfig(locale: 'zh' | 'en'): HeadConfig[] {
  const isChinese = locale === 'zh'
  const description = isChinese
    ? '面向 Komga 与本地媒体库的 Android 漫画和书籍阅读器。'
    : 'An Android comics and books reader for Komga and local media libraries.'

  return [
    ['meta', { name: 'theme-color', content: '#0058A0' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/img/koharia-logo.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/koharia-logo.png' }],
    ['meta', { property: 'og:site_name', content: 'Koharia' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:locale', content: isChinese ? 'zh_CN' : 'en_US' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ]
}
