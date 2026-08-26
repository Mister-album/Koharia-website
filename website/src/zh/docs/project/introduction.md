---
title: Koharia 介绍
description: 了解 Koharia 的 Komga、本地库、格式支持与阅读体验。
pageClass: koharia-introduction
---

# Koharia 介绍

Koharia 是一款面向 Komga 与本地媒体库的开源 Android 漫画和书籍阅读器。
它把服务器浏览、设备文件管理、作品详情、阅读进度、离线访问与阅读设置整合在同一个应用中。

<div class="koharia-showcase">
  <img src="/img/koharia/zh-library.png" alt="Koharia 主界面" loading="lazy" decoding="async" />
  <img src="/img/koharia/zh-comic-reader.png" alt="Koharia 漫画阅读界面" loading="lazy" decoding="async" />
  <img src="/img/koharia/zh-series-details.png" alt="Koharia 作品详情页" loading="lazy" decoding="async" />
  <img src="/img/koharia/zh-book-reader.png" alt="Koharia 书籍阅读界面" loading="lazy" decoding="async" />
</div>

## Koharia 适合谁

Koharia 适合希望在 Android 上统一阅读个人漫画与书籍收藏的用户。
你可以连接自己部署或有权访问的 Komga 服务器，也可以直接关联设备或 SD 卡上的目录，不必为了使用本地库而部署服务器。

Koharia 不提供或托管任何媒体内容。
你能浏览的内容取决于所连接服务器的账户权限，以及你主动授权给应用的本地目录。

## 核心功能

- 连接一个或多个 Komga 服务器。
- 创建一条或多条本地库连接，关联现有目录或由 Koharia 创建书库目录。
- 将漫画和书籍分开管理，也可使用合并书架与自定义书库。
- 以系列库或单文件库方式组织本地内容，并通过刷新重建索引。
- 使用漫画阅读器阅读图片、压缩包、PDF 与 DjVu，使用可重排阅读器阅读 EPUB、TXT 和实验性 Mobipocket / Kindle 文本。
- 保存本地阅读状态，并为支持的 Komga 内容同步进度和历史记录。
- 将 Komga 内容手动下载或缓存，以便在网络不可用时继续阅读。

## 本地格式

本地库支持漫画压缩包（CBZ、ZIP、CBR、RAR、7Z、CB7、TAR、CBT）、常见图片与图片目录，以及 EPUB、PDF、TXT、MOBI、PRC、AZW、AZW3、DjVu 等内容。
不同格式会自动进入适合的漫画或书籍阅读流程。

MOBI、PRC、AZW 和 AZW3 目前为实验性文本支持，不支持 DRM、复杂布局和内嵌图片；DjVu 阅读依赖设备 Android WebView 的 WebAssembly 能力。

## 系统要求

Koharia 需要 Android 8.0 或更高版本。

使用 Komga 前，请确保设备能够访问服务器，并准备好服务器地址及登录凭据或 API Key。
使用本地库时，请通过 Android 系统文件选择器授予 Koharia 对相应目录的持续访问权限。

## 下一步

- [下载 Koharia](/zh/download/)
- [完成初始化设置](/zh/docs/getting-started/initial-setup)
- [添加 Komga 服务器](/zh/docs/getting-started/add-server)
- [添加本地库](/zh/docs/getting-started/add-local-library)
