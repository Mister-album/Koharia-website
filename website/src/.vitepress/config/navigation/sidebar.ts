import type { DefaultTheme } from 'vitepress'

export function createSidebar(locale: 'zh' | 'en'): DefaultTheme.SidebarMulti {
  const isChinese = locale === 'zh'
  const prefix = `/${locale}`
  const sidebar: DefaultTheme.SidebarItem[] = [
    {
      text: isChinese ? '项目介绍' : 'About',
      items: [
        { text: isChinese ? 'Koharia 介绍' : 'About Koharia', link: `${prefix}/docs/project/introduction` },
        { text: isChinese ? '更新日志' : 'Changelog', link: `${prefix}/changelogs/` },
        { text: isChinese ? '免责声明' : 'Disclaimer', link: `${prefix}/docs/project/disclaimer` },
      ],
    },
    {
      text: isChinese ? '开始使用' : 'Get started',
      items: [
        { text: isChinese ? '下载' : 'Download', link: `${prefix}/download/` },
        { text: isChinese ? '初始化设置' : 'Initial setup', link: `${prefix}/docs/getting-started/initial-setup` },
        { text: isChinese ? '添加服务器' : 'Add a server', link: `${prefix}/docs/getting-started/add-server` },
      ],
    },
    {
      text: isChinese ? '设置参数' : 'Settings',
      items: [
        { text: isChinese ? '书架' : 'Library', link: `${prefix}/docs/settings/library` },
        { text: isChinese ? '漫画阅读器' : 'Manga reader', link: `${prefix}/docs/settings/manga-reader` },
        { text: isChinese ? '书籍阅读器' : 'Book reader', link: `${prefix}/docs/settings/book-reader` },
        { text: isChinese ? '存储指南' : 'Storage guide', link: `${prefix}/docs/settings/storage` },
        { text: isChinese ? '下载' : 'Downloads', link: `${prefix}/docs/settings/downloads` },
        { text: isChinese ? '其他设置' : 'Other settings', link: `${prefix}/docs/settings/other` },
      ],
    },
    {
      text: isChinese ? '帮助' : 'Help',
      items: [
        { text: isChinese ? '常见问题' : 'FAQ', link: `${prefix}/docs/faq/general` },
        { text: isChinese ? '故障排查' : 'Troubleshooting', link: `${prefix}/docs/guides/troubleshooting/` },
        { text: isChinese ? '交流反馈' : 'Feedback', link: `${prefix}/docs/help/feedback` },
        { text: isChinese ? '开源许可证' : 'Open-source licenses', link: `${prefix}/docs/help/licenses` },
        { text: isChinese ? '隐私说明' : 'Privacy', link: `${prefix}/privacy/` },
      ],
    },
    {
      text: isChinese ? '新闻' : 'News',
      link: `${prefix}/news/`,
    },
    {
      text: isChinese ? '支持项目' : 'Support',
      link: `${prefix}/support/`,
    },
    {
      text: isChinese ? '参与贡献' : 'Contribute',
      link: `${prefix}/docs/contribute`,
    },
  ]

  return {
    [`${prefix}/download/`]: sidebar,
    [`${prefix}/docs/project/`]: sidebar,
    [`${prefix}/docs/getting-started/`]: sidebar,
    [`${prefix}/docs/settings/`]: sidebar,
    [`${prefix}/docs/help/`]: sidebar,
    [`${prefix}/docs/faq/`]: sidebar,
    [`${prefix}/docs/guides/`]: sidebar,
    [`${prefix}/docs/contribute`]: sidebar,
    [`${prefix}/changelogs/`]: sidebar,
    [`${prefix}/news/`]: sidebar,
    [`${prefix}/privacy/`]: sidebar,
    [`${prefix}/support/`]: sidebar,
  }
}
