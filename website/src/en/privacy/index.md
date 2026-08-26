---
title: Privacy policy
description: How Koharia handles local libraries, device data, Komga connections, and external-service links.
---

<!-- The general policy structure on this page is adapted from the Mihon website under MPL-2.0. -->

# Privacy policy

This policy describes the basic privacy practices for the Koharia Android app and official website.
Koharia is an open-source reader that connects to Komga servers you configure and reads folders you explicitly authorize; it does not provide media content or a separate content-account service.

## Local data

To provide reading, sync, and offline features, the app may store the following data on your device:

- Server addresses, authentication method, and connection-related settings.
- Information about libraries available to the current account and reading preferences.
- Reading progress, bookmarks, and other reading state.
- Downloaded content, cache, and your chosen storage location.
- Local-library folder grants, the on-device local index, and metadata you edit in the app.

The exact data depends on the features you enable, the Komga servers you connect, and the local libraries you add.

## Network connections

When you use Koharia, network requests are sent to:

- Komga servers that you add, for authentication, browsing libraries, reading content, and syncing reading state.
- GitHub, for checking app updates, opening the Releases page, or downloading official installation packages.

Koharia does not provide, host, or index media content for you.
Your access permissions, server logs, and data practices in Komga are determined by that server's operator.

Local-library scanning and indexing occur on the device.
Linking a local folder does not itself send its media to Komga unless you deliberately use another feature that requires a network service.

## External links

The website and app may link to GitHub, Aifadian, or other third-party websites.
When you open an external link, review that service's privacy policy; Koharia cannot control how those services handle data.

## Your control

You can remove relevant configuration and index data by deleting a server or local-library connection, clearing downloaded content, or clearing app data.
Deleting a local-library connection or removing one of its folders does not delete the original files; clearing app data may remove metadata and reading state kept only in the app database.
Before doing so, check whether you need to retain reading records, downloads, or server connection settings.

Protect your Komga account, password, and API keys, and do not expose them in public issues, screenshots, or logs.

## Policy updates

This page will be updated when app features or data-handling practices change materially.
Review it periodically after updating the app.

## Contact

To report a privacy concern, open an issue in [Koharia Issues](https://github.com/Mister-album/Koharia/issues) without including sensitive information publicly.
