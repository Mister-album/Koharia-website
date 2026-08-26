---
title: Troubleshooting
description: Resolve common Komga connection, local-library scan, and reading problems in Koharia.
---

# Troubleshooting

## Cannot connect to the server

Check the server address, port, and credentials.

Make sure that the Android device can reach the Komga server on the network.

## Reading or download fails

First verify that the same account can open the item in the Komga web interface.

Then check device storage and the network connection before reopening the book.

## Files are missing from a local library

Confirm that the folder still exists and Koharia still has the access granted by Android, then pull to refresh in the local library.
Check that the format is supported and note the organization mode: a series library treats only direct child folders of the root as items, while a single-file library recursively displays supported files and image folders.

If some folders cannot be read, Koharia retains the existing index; grant access again and refresh.

## A local file cannot be imported

Importing requires at least one configured local-library connection and a writable destination whose content type matches the selected files.
Direct open supports one file at a time; use the import flow for multiple files.

## Still need help

Open a [GitHub Issue](https://github.com/Mister-album/Koharia/issues) with the Koharia version, Android version, reproduction steps, and logs with sensitive information removed.
