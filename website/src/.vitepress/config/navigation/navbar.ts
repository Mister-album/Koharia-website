import type { DefaultTheme } from 'vitepress'

export function createNav(locale: 'zh' | 'en'): DefaultTheme.NavItem[] {
  const isChinese = locale === 'zh'
  const prefix = `/${locale}`

  return [
    { text: isChinese ? '文档' : 'Docs', link: `${prefix}/docs/project/introduction` },
    { text: isChinese ? '下载' : 'Download', link: `${prefix}/download/` },
    { text: isChinese ? '新闻' : 'News', link: `${prefix}/news/` },
  ]
}
