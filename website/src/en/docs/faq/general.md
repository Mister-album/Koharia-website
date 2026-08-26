---
title: FAQ
description: Common questions about Koharia, Komga, local libraries, formats, and reading progress.
---

# FAQ

## What is Koharia?

Koharia is a third-party Android comics and books reader for Komga and local media libraries.

It can browse content available to the current Komga account or scan device folders you authorize, with suitable reading experiences for comics, PDF, and reflowable books.

## Does Koharia provide content?

No.

Koharia only displays content you are allowed to access through your own Komga server or local content that you explicitly authorize the app to scan.

## Does a local library require Komga?

No.

Choose **Use local folder** during first-time setup to create a local-library connection.
Komga servers and local libraries are independent content sources that can coexist.

## Does linking a folder move or delete files?

No.

**Add existing directory** only grants Koharia access and builds an index; removing that folder from a local library also leaves the original files intact.
Importing media, creating library directories, or writing sidecar metadata does require a writable location.

## Which local formats are supported?

Koharia supports common images and image folders, CBZ / ZIP / CBR / RAR / 7Z / TAR and other comic archives, plus EPUB, PDF, TXT, MOBI / PRC / AZW / AZW3, and DjVu.
Mobipocket and Kindle text support is experimental without DRM, complex layouts, or embedded images; DjVu depends on the WebAssembly capability of the device's WebView.

## Why is a library missing?

First, confirm that the library exists in Komga and that the current account has permission to access it.
After connecting, refresh the libraries; if it is still missing, check the server connection and account permissions.

## How does reading progress sync?

For supported content, Koharia syncs reading progress to Komga while the device can connect to the server.
Sync does not mean offline content is automatically uploaded or downloaded; network and server availability still affect the result.
Reading positions, history, and bookmarks for local libraries remain on the device and are not uploaded to Komga.

## What should I do when a download fails?

For a Komga download, check free storage, file permissions, network access, and server availability.
Also confirm in Komga's web interface that the same account can open the content.

For more steps, see [Troubleshooting](/en/docs/guides/troubleshooting/).

## Which Android versions are supported?

Koharia requires Android 8.0 or later.
