---
title: Storage guide
description: Understand Koharia storage locations, downloads, caches, and migration.
---

# Storage guide

Koharia uses your selected storage location for automatic backups, offline downloads, and local content.
Temporary caches and the application database remain in the app's private storage.

## Choose a storage location

Select a folder during onboarding or later from **Settings → Data and storage → Storage location**.

::: tip Recommended setup

- Create a dedicated `Koharia` folder at the top level of internal storage, such as `Internal storage/Koharia`.
- Grant access to the complete `Koharia` folder in Android's system file picker.
- Do not select a child folder such as `downloads` or `autobackup`; Koharia creates these inside the selected location.
- Avoid the storage device root and restricted system folders such as **Downloads** and **Documents**.

:::

Internal storage is usually more stable and has lower latency than an SD card.
When using an SD card, make sure Android can retain access through the system file picker and do not remove the card while Koharia is running or downloading.

## Directory layout

Koharia maintains the following structure inside the selected folder:

```text
Koharia/
├─ autobackup/
├─ downloads/
│  ├─ <Komga server name>/
│  │  └─ <series title>/
│  │     └─ <chapter or book file/directory>
│  └─ Komga (Shared)/
└─ local/
```

- `autobackup` contains backups created automatically by the app.
- `downloads` contains manga chapters, EPUB books, PDFs, and other offline content.
- `local` is retained for local-source compatibility; ordinary Komga downloads are not stored there.

Characters that are invalid for the device file system are safely replaced in server, series, and chapter names.
An offline item may be an EPUB, PDF, archive, or a chapter directory containing images.
Use the download state shown in Koharia instead of relying on a particular file extension to determine whether an item is complete.

## Komga download directory modes

Server management offers two directory modes:

- **Per server** is the default and gives each Komga server its own directory, keeping sources and server cleanup separate.
- **Shared directory** stores downloads from multiple Komga servers under `Komga (Shared)`, which can avoid duplicate offline files when the servers expose the same or heavily overlapping libraries.

Change the mode from Koharia's server management screen.
Do not manually merge server directories in a file manager, because the download index may no longer match the correct Komga content.

## Downloads and temporary caches

Completed downloads live under `downloads` in the selected storage location and are used for offline reading.
Covers, network responses, metadata, temporary reading chapters, and extracted EPUB data are caches stored in the app's private directory.

Clearing caches may require Koharia to fetch covers, metadata, or reading content again, but cache cleanup is not intended to delete completed downloads or backups.
Clearing **app data** in Android settings or uninstalling Koharia also removes its database, server configuration, and reading state, so it is not equivalent to clearing a normal cache.

## Change or migrate the storage location

Pause all downloads and create a current backup before changing the storage location.
Selecting a new folder in Settings does not guarantee that existing files are migrated automatically.

To retain existing offline content:

1. Stop Koharia download jobs.
2. Copy the complete directory structure from the old location to a new dedicated folder.
3. Select the new root under **Settings → Data and storage → Storage location**.
4. Open **Settings → Advanced → Reindex downloads** so Koharia scans the copied content.
5. Verify offline content and backups before deleting the old files.

Do not select the `downloads` folder itself as the storage location.
Select its parent—the folder that contains `downloads`, `autobackup`, and `local`.

## Android scoped storage

Android 11 and later use scoped storage to restrict applications from reading the entire device.
Koharia uses Android's system file picker to retain read and write access only to the folder you select; it does not need broad access to every file.

If Android revokes the permission, an SD card is reformatted, or another app moves the directory, Koharia cannot create or recognize downloads.
Select the correct storage root again and then reindex downloads.

## Troubleshooting checklist

If Koharia cannot create a download, completed items suddenly appear missing, or backups fail, check the following:

1. The storage device is still connected and writable.
2. There is enough free space for both the download and temporary files.
3. Koharia still has access to the selected folder.
4. The selected location is the dedicated root, not the `downloads` child folder or a restricted system directory.
5. Downloads were reindexed after files were moved manually.

If the issue continues, see [Troubleshooting](/en/docs/guides/troubleshooting/) and include the Android version, storage medium, and error message in your report.

For queue and network options, see [Download settings](/en/docs/settings/downloads).
