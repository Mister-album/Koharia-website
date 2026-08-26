---
title: Add a local library
description: Link existing folders or create local comics and books folders managed by Koharia.
---

# Add a local library

A local-library connection lets Koharia scan device folders that you authorize, without requiring a Komga server.
You can link folders you already use or let Koharia create comics and books folders.

## Before you start

- Keep the files in a location available through Android's system file picker; supported internal storage and SD-card locations can be used.
- Linking an existing folder only grants Koharia access to scan it; the original files are not moved or deleted.
- If you want to import files or write metadata to the folder, make sure the selected location is writable.

## Step 1: Name the local library

Choose **Use local folder** during first-time setup, then give the local-library connection a recognizable name.
You can create multiple local-library connections for separate folders or organization styles.

## Step 2: Choose libraries and organization

Enable comics, books, or both, and name the default library for each type.
Each library type needs one organization mode:

- **Series library:** A direct child folder of the root is a series, while files and image folders inside it are chapters or volumes; the shelf shows the series first and opens its details screen.
- **Single-file library:** Koharia scans subfolders recursively and displays every supported file or image folder as an independent item that opens directly.

Series library works best for folders already arranged by title or series, while single-file library suits loose books and files without a fixed hierarchy.
The organization mode cannot be changed after the local library is created; create a new library and link the relevant folder to use another mode.

## Step 3: Add folders

Choose either approach:

- **Add existing directory:** Select an existing comics or books folder; Koharia retains access and builds a local index without rearranging files.
- **Create library directories:** Select a parent location; Koharia creates `Comics`, `Books`, and `.koharia` folders according to the content types you enabled.

Each enabled content type needs at least one matching folder before you can continue.
Removing a folder from the local library clears only Koharia's index and does not delete files in that folder.

## Step 4: Choose metadata storage

Metadata storage controls where edits made in Koharia are written:

- **App database:** The safest default and does not write files to library folders.
- **Adjacent sidecar:** Writes `ComicInfo.xml` or `metadata.opf` beside an item when you edit its metadata.
- **Unified metadata directory:** Stores JSON sidecars under the local library's `.koharia/metadata` folder.

This choice cannot be changed after setup, so review it before selecting **Finish**.

## Scanning and importing

After setup, Koharia indexes the folders and displays their items on the shelf.
Pull to refresh after adding, moving, or changing files; if Android revokes folder access, grant it again.

You can also send a supported file to Koharia from Android's open-with or share interface.
A single file can be read from a temporary copy, or imported into a writable folder in a configured local library.

## Supported local content

| Type | Supported extensions or form |
| --- | --- |
| Comic archives | `CBZ`, `ZIP`, `CBR`, `RAR`, `7Z`, `CB7`, `TAR`, `CBT` |
| Images and image folders | `JPG`, `JPEG`, `PNG`, `GIF`, `WEBP`, `AVIF`, `HEIF`, `HEIC`, `JXL` |
| E-books and documents | `EPUB`, `PDF`, `TXT`, `MOBI`, `PRC`, `AZW`, `AZW3`, `DJVU`, `DJV` |

MOBI, PRC, AZW, and AZW3 have experimental text-reading support without DRM, complex layouts, or embedded images.
DjVu reading depends on the WebAssembly capability of Android WebView on the device.

## Next steps

- [Set up the library](/en/docs/settings/library)
- [Manga reader](/en/docs/settings/manga-reader)
- [Book reader](/en/docs/settings/book-reader)
