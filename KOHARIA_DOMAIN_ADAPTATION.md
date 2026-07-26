# Koharia 域名与内部跳转适配指南

本文用于将 Koharia 的公开网站域名从历史占位域名迁移到 `koharia.org`，并指导 Android 应用、GitHub 文档、发布说明和外部入口同步更新链接。

## 1. 目标地址与路由约定

生产环境的唯一规范域名为 `https://koharia.org`。

| 用途 | 地址 | 说明 |
| --- | --- | --- |
| 根入口 | `https://koharia.org/` | 302 跳转到中文站。 |
| 中文站 | `https://koharia.org/zh/` | 默认内容语言。 |
| 英文站 | `https://koharia.org/en/` | 英文内容语言。 |
| 下载页 | `/{locale}/download/` | `locale` 为 `zh` 或 `en`。 |
| 更新日志 | `/{locale}/changelogs/` | 版本详情为 `/{locale}/changelogs/{tag}`。 |
| 新闻 | `/{locale}/news/` | 第一版可能显示“暂无新闻”。 |
| Koharia 介绍 | `/{locale}/docs/project/introduction` | 项目定位、功能和系统要求。 |
| 免责声明 | `/{locale}/docs/project/disclaimer` | 内容、账号与软件责任边界。 |
| 初始化设置 | `/{locale}/docs/getting-started/initial-setup` | 应用内新手引导入口。 |
| 添加服务器 | `/{locale}/docs/getting-started/add-server` | Komga 地址和认证设置。 |
| 书架设置 | `/{locale}/docs/settings/library` | 媒体库分类、显示和更新。 |
| 漫画阅读器 | `/{locale}/docs/settings/manga-reader` | 图片式漫画阅读设置。 |
| 书籍阅读器 | `/{locale}/docs/settings/book-reader` | EPUB 阅读设置。 |
| 下载设置 | `/{locale}/docs/settings/downloads` | 下载队列和本地存储。 |
| 其他设置 | `/{locale}/docs/settings/other` | 外观、数据、更新和安全。 |
| 常见问题 | `/{locale}/docs/faq/general` | 常见使用问题入口。 |
| 故障排查 | `/{locale}/docs/guides/troubleshooting/` | 日志和连接问题入口。 |
| 交流反馈 | `/{locale}/docs/help/feedback` | GitHub Issue 的反馈规范。 |
| 开源许可证 | `/{locale}/docs/help/licenses` | 应用和网站的许可证与归属。 |
| 隐私说明 | `/{locale}/privacy/` | 应用内隐私入口应使用该地址。 |
| 支持项目 | `/{locale}/support/` | 爱发电支持入口。 |
| 参与贡献 | `/{locale}/docs/contribute` | GitHub、翻译与贡献入口。 |

站点内部链接应继续使用以 `/zh/` 或 `/en/` 开头的绝对路径，例如 `/zh/download/`。

只有应用、README、GitHub Release、社交资料和邮件等站外入口需要使用完整 URL，例如 `https://koharia.org/zh/download/`。

不要再新建无语言前缀的 `/docs/**`、`/download/**` 或 `/privacy/**` 链接。

## 2. 网站仓库修改清单

### 域名和部署

1. 在 Netlify 为此站点添加 `koharia.org`，并将其设为 Primary domain。
2. 如需启用 `www.koharia.org`，将其设为别名并由 Netlify 重定向到 `https://koharia.org`。
3. 按 Netlify 域名面板显示的记录配置域名 DNS。
   对根域使用面板要求的 A、ALIAS 或 ANAME 记录。
   对 `www` 使用面板要求的 CNAME 记录。
4. 等待 Netlify 签发 HTTPS 证书后，启用强制 HTTPS。
5. `website/src/.vitepress/config.ts` 的本地回退值已配置为 `https://koharia.org`，不要改回旧域名。

`netlify.toml` 的生产构建命令已经使用 `VITE_HOSTNAME=$URL`。

Netlify 将在生产构建时传入主域名，因此 sitemap 会自动使用 `koharia.org`。

部署预览仍应使用 `$DEPLOY_PRIME_URL`，不要把预览环境强制改为正式域名。

### GitHub Release 数据

下载页和更新日志在构建时读取 `Mister-album/Koharia` 的 GitHub Releases。
为避免匿名 GitHub API 的限流，在 Netlify 的环境变量中新增 `GITHUB_TOKEN`。

该令牌只需要读取 `Mister-album/Koharia` 公开 Release 的权限；不要把令牌写进仓库、Markdown 文件或客户端代码。

本仓库的 GitHub Pages 工作流已使用 Actions 自动提供的 `GITHUB_TOKEN`。

### 重定向

`website/src/public/_redirects` 中的根路径规则应保留：

```text
/  /zh/  302
```

第一版仅保留根路径跳转，不保留无语言前缀的旧 `/help/**` 或 `/docs/**` 规则。

新建应用内或公开入口时，请直接使用本表中的语言前缀规范地址，不要依赖旧路径重定向。

### 站内链接与新增页面

新增或修改 Markdown 页面时，中文文件放在 `website/src/zh/`，英文文件放在 `website/src/en/`。

两个语言目录的页面结构必须保持一致。

例如新增“备份”页面时，应同时创建：

```text
website/src/zh/docs/settings/backups.md
website/src/en/docs/settings/backups.md
```

随后在 `website/src/.vitepress/config/navigation/sidebar.ts` 为两种语言增加相应导航项。

不要在中文页面直接链接 `/en/`，或在英文页面直接链接 `/zh/`，除非该链接就是显式语言切换。

## 3. Koharia Android 项目适配

在 `E:\project\Koharia` 中全局搜索 `https://koharia.app`。

将所有应用内帮助链接替换为带语言前缀的完整 `.org` URL。

第一版推荐统一使用中文入口：

| 现有用途 | 建议新地址 |
| --- | --- |
| 新手引导 | `https://koharia.org/zh/docs/getting-started/initial-setup` |
| 添加服务器 | `https://koharia.org/zh/docs/getting-started/add-server` |
| 故障排查 | `https://koharia.org/zh/docs/guides/troubleshooting/` |
| 书架设置 | `https://koharia.org/zh/docs/settings/library` |
| 下载设置 | `https://koharia.org/zh/docs/settings/downloads` |
| 隐私政策 | `https://koharia.org/zh/privacy/` |
| 交流反馈 | `https://koharia.org/zh/docs/help/feedback` |
| 开源许可证 | `https://koharia.org/zh/docs/help/licenses` |
| 贡献与翻译 | `https://koharia.org/zh/docs/contribute` |

当前网站不保留历史 Mihon 帮助页面、Cloudflare 专用段落或旧 FAQ 锚点。

原本带 `#cloudflare` 或旧 FAQ 锚点的链接应更新为上表中的对应页面根路径。

已知需要检查的应用文件包括：

- `app/src/main/java/eu/kanade/presentation/webview/WebViewScreenContent.kt`
- `app/src/main/java/eu/kanade/presentation/more/onboarding/GuidesStep.kt`
- `app/src/main/java/eu/kanade/presentation/more/settings/screen/about/AboutScreen.kt`
- `app/src/main/java/eu/kanade/tachiyomi/data/library/LibraryUpdateJob.kt`
- `app/src/main/java/eu/kanade/tachiyomi/data/library/LibraryUpdateNotifier.kt`
- `app/src/main/java/eu/kanade/presentation/more/settings/screen/SettingsDataScreen.kt`
- `i18n/README.md`

应用不应依赖根路径 `/` 的自动跳转。

使用明确的 `/zh/` 或 `/en/` 路径可以避免语言策略变化影响应用内入口。

## 4. GitHub 与外部资料

更新以下位置中的站点主页、下载页、隐私政策和支持链接：

- `Mister-album/Koharia` 的 README、About、Release 说明、Issue 模板和 Wiki。
- `Mister-album/Koharia-website` 的 README 和仓库 About。
- GitHub Release 的下载说明。
- 爱发电、社交资料和其他公开介绍页。

应用更新检查仍然使用 GitHub Releases：

```text
https://github.com/Mister-album/Koharia/releases
```

该地址不因网站域名迁移而变化。

## 5. 上线验证

域名配置和代码修改完成后，执行以下检查：

```powershell
cd E:\project\Koharia-website\website
pnpm test
pnpm dev
```

在浏览器中验证：

1. `https://koharia.org/` 跳转到 `https://koharia.org/zh/`。
2. `https://koharia.org/en/` 可直接访问，并能正常切换语言。
3. 下载页、更新日志、新闻、隐私和核心文档均使用 `koharia.org`。
4. sitemap 中没有 `koharia.app`、无语言前缀旧 Docs 路径、Extensions 或 Forks 页面。
5. Android 应用中的每个帮助入口均打开对应的 `.org/zh/` 页面。
6. Netlify Production 和 Deploy Preview 的 sitemap 主机名分别为正式域名和预览域名。

## 6. 迁移完成条件

当以下条件全部满足时，可以认为域名迁移完成：

- Netlify 已为 `koharia.org` 签发有效 HTTPS 证书。
- `koharia.org` 是唯一的 Production Primary domain。
- 网站配置的默认主机名、sitemap 和公开元数据均使用 `https://koharia.org`。
- Koharia 应用与公开资料不再引用 `koharia.app`。
- 所有公开帮助链接包含明确的 `/zh/` 或 `/en/` 语言前缀。
