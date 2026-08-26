---
title: About Koharia
description: Learn about Koharia's Komga, local-library, format, and reading capabilities.
pageClass: koharia-introduction
---

# About Koharia

Koharia is an open-source Android comics and books reader for Komga and local media libraries.
It brings server browsing, device-file management, item details, reading progress, offline access, and reader settings together in one app.

<div class="koharia-showcase">
  <img src="/img/koharia/en-library.png" alt="Koharia library screen" loading="lazy" decoding="async" />
  <img src="/img/koharia/en-comic-reader.png" alt="Koharia comic reader" loading="lazy" decoding="async" />
  <img src="/img/koharia/en-series-details.png" alt="Koharia series details screen" loading="lazy" decoding="async" />
  <img src="/img/koharia/en-epub-reader.png" alt="Koharia EPUB reader" loading="lazy" decoding="async" />
</div>

## Who Koharia is for

Koharia is for people who want to read a personal comics and books collection together on Android.
You can connect a Komga server that you run or are allowed to access, or link folders on the device or an SD card without deploying a server for local-library use.

Koharia does not provide or host media content.
What you can browse depends on the account permissions of connected servers and the local folders that you explicitly authorize.

## Core features

- Connect one or more Komga servers.
- Create one or more local-library connections, link existing folders, or let Koharia create library folders.
- Manage comics and books separately, or use a combined shelf and custom libraries.
- Organize local content as a series library or single-file library and rebuild its index with refresh.
- Use the comics reader for images, archives, PDF, and DjVu, and the reflowable reader for EPUB, TXT, and experimental Mobipocket / Kindle text.
- Retain local reading state and sync progress and history for supported Komga content.
- Manually download or cache Komga content for reading when the network is unavailable.

## Local formats

Local libraries support comic archives (CBZ, ZIP, CBR, RAR, 7Z, CB7, TAR, and CBT), common images and image folders, and EPUB, PDF, TXT, MOBI, PRC, AZW, AZW3, and DjVu content.
Each format is routed to the appropriate comics or books reading experience.

MOBI, PRC, AZW, and AZW3 currently have experimental text support without DRM, complex layouts, or embedded images; DjVu reading depends on the WebAssembly capability of Android WebView on the device.

## System requirements

Koharia requires Android 8.0 or later.

Before using Komga, make sure your device can reach the server and have its address plus sign-in credentials or API key ready.
For a local library, grant Koharia persistent access to the relevant folders through Android's system file picker.

## Next steps

- [Download Koharia](/en/download/)
- [Complete initial setup](/en/docs/getting-started/initial-setup)
- [Add a Komga server](/en/docs/getting-started/add-server)
- [Add a local library](/en/docs/getting-started/add-local-library)
