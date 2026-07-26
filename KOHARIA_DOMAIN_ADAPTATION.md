# Koharia 域名与内部跳转适配指南

本文记录 Koharia 官网在 `koharia.org` 上的部署方式、公开路由和各外部入口的适配要求。

## 1. 当前部署架构

生产站点使用 Cloudflare Workers Static Assets，并由 Cloudflare Workers Builds 连接 `Mister-album/Koharia-website` 仓库。

Cloudflare 项目使用以下设置：

| 设置 | 值 |
| --- | --- |
| Worker 名称 | `koharia-website` |
| 生产分支 | `main` |
| 根目录 | `website` |
| 构建命令 | `pnpm build` |
| 生产部署命令 | `pnpm exec wrangler deploy` |
| 非生产部署命令 | `pnpm exec wrangler versions upload` |
| 构建输出目录 | `website/dist` |
| 正式域名 | `https://koharia.org` |

Wrangler 配置位于 `website/wrangler.jsonc`，静态资源目录必须保持为 `./dist`。
Cloudflare 构建环境需要名为 `GITHUB_TOKEN` 的加密变量，以提高构建期间读取 Koharia Releases 时的 GitHub API 限额。
该令牌不得写入仓库、Markdown、客户端代码或构建日志。

GitHub Pages 部署工作流和发布配置已经移除。
生产部署完全由 Cloudflare Workers Builds 负责。

## 2. 规范域名与公开路由

所有公开链接统一使用 `https://koharia.org`，不再使用 `koharia.app`、Netlify 域名或固定的 `workers.dev` 地址。

| 用途 | 中文 | 英文 |
| --- | --- | --- |
| 首页 | `/zh/` | `/en/` |
| 下载 | `/zh/download/` | `/en/download/` |
| 更新日志 | `/zh/changelogs/` | `/en/changelogs/` |
| 新闻 | `/zh/news/` | `/en/news/` |
| Koharia 介绍 | `/zh/docs/project/introduction` | `/en/docs/project/introduction` |
| 免责声明 | `/zh/docs/project/disclaimer` | `/en/docs/project/disclaimer` |
| 初始化设置 | `/zh/docs/getting-started/initial-setup` | `/en/docs/getting-started/initial-setup` |
| 添加服务器 | `/zh/docs/getting-started/add-server` | `/en/docs/getting-started/add-server` |
| 书架设置 | `/zh/docs/settings/library` | `/en/docs/settings/library` |
| 漫画阅读器 | `/zh/docs/settings/manga-reader` | `/en/docs/settings/manga-reader` |
| 书籍阅读器 | `/zh/docs/settings/book-reader` | `/en/docs/settings/book-reader` |
| 下载设置 | `/zh/docs/settings/downloads` | `/en/docs/settings/downloads` |
| 存储指南 | `/zh/docs/settings/storage` | `/en/docs/settings/storage` |
| 其他设置 | `/zh/docs/settings/other` | `/en/docs/settings/other` |
| 常见问题 | `/zh/docs/faq/general` | `/en/docs/faq/general` |
| 故障排查 | `/zh/docs/guides/troubleshooting/` | `/en/docs/guides/troubleshooting/` |
| 交流反馈 | `/zh/docs/help/feedback` | `/en/docs/help/feedback` |
| 开源许可证 | `/zh/docs/help/licenses` | `/en/docs/help/licenses` |
| 隐私说明 | `/zh/privacy/` | `/en/privacy/` |
| 支持项目 | `/zh/support/` | `/en/support/` |
| 参与贡献 | `/zh/docs/contribute` | `/en/docs/contribute` |

根路径 `/` 通过 `website/src/public/_redirects` 临时重定向到 `/zh/`。
应用和外部资料必须直接使用带语言前缀的完整 URL，不应依赖根路径重定向。
网站内部链接也必须带 `/zh/` 或 `/en/` 前缀。
首版不为 Mihon 的旧路径、无语言前缀路径或旧锚点提供兼容重定向。

## 3. Android 应用适配

在 `E:\project\Koharia` 中搜索旧域名、Mihon 链接和无语言前缀的帮助地址。
应用应根据界面语言选择对应的中文或英文 URL；尚未实现语言映射的入口可以先明确指向中文页面。

至少检查以下入口：

- 新手引导和添加服务器；
- 连接与阅读故障排查；
- 书架、阅读器和下载设置；
- 隐私说明和开源许可证；
- 反馈、贡献和翻译；
- 关于页面中的官网、下载和 Release 链接。

例如中文隐私入口应为 `https://koharia.org/zh/privacy/`，英文隐私入口应为 `https://koharia.org/en/privacy/`。
应用更新检查继续使用 `https://github.com/Mister-album/Koharia/releases`，不经过网站转发。

## 4. Release 与网站自动更新

下载页在构建时读取 `Mister-album/Koharia` 的最新正式 GitHub Release。
通用 APK 的规范名称为：

```text
Koharia-<tag>-release.apk
```

例如标签为 `v1.2.0` 时，文件名应为 `Koharia-v1.2.0-release.apk`。
如果找不到这个文件，下载按钮会安全降级到对应的 GitHub Release 页面。

Koharia 主仓库需要保存以下 GitHub Actions Secret：

```text
CLOUDFLARE_WORKERS_DEPLOY_HOOK
```

它的值是 Cloudflare 为 `main` 分支生成的 Deploy Hook URL。
Deploy Hook URL 本身就是凭证，不得提交到仓库或公开展示。
正式 Release 发布后，主仓库工作流会向该地址发送 `POST` 请求，触发 Cloudflare 重新构建网站，使下载页和更新日志读取新版本。

## 5. 网站内容维护规则

中文 Markdown 放在 `website/src/zh/`，英文 Markdown 放在 `website/src/en/`。
两个目录的页面结构应保持对应，以便语言切换保留当前页面类型。

新增页面后需要同步检查：

1. 两种语言的 Markdown 文件；
2. `website/src/.vitepress/config/navigation/` 下的导航与侧栏；
3. 页面内链接是否保留当前语言前缀；
4. Sitemap 是否仅包含正式公开页面；
5. 应用或 README 中是否需要新增完整的公开 URL。

## 6. Cloudflare 运维说明

生产分支 `main` 的提交会自动构建并部署到 `koharia.org`。
非生产分支使用 `wrangler versions upload` 创建预览版本，不替换生产环境。
预览 URL 仅用于测试，不应写入应用、README、Release 或搜索引擎元数据。

如需关闭固定的生产 `workers.dev` 地址，可在 `website/wrangler.jsonc` 中设置 `workers_dev: false`，并保留 `preview_urls: true` 供分支预览使用。
修改这一设置前，应先确认自定义域名和预览构建均正常。

Cloudflare 中的敏感配置包括：

- Workers Builds 的 `GITHUB_TOKEN`；
- Deploy Hook URL；
- 未来可能增加的账户级 API Token。

日常 GitHub 自动构建和 Deploy Hook 不需要在仓库中保存 Cloudflare API Token。
只有通过 Wrangler 从 GitHub Actions 主动部署时，才通常需要 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。

## 7. 验证清单

在本地执行：

```powershell
cd E:\project\Koharia-website\website
pnpm test
```

部署后检查：

1. `https://koharia.org/` 跳转到 `https://koharia.org/zh/`；
2. `/zh/`、`/en/` 和各文档二级路径可直接刷新；
3. `https://koharia.org/robots.txt` 明确允许抓取并指向 Sitemap；
4. `https://koharia.org/sitemap.xml` 只使用正式域名；
5. 下载页匹配 `Koharia-<tag>-release.apk`；
6. 正式 Release 发布后，Cloudflare 出现由 Deploy Hook 触发的新构建；
7. 仓库中不存在 GitHub Pages 部署工作流或发布配置；
8. 网站、应用和公开资料中不再出现 Netlify 或旧域名说明。
