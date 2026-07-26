---
outline: false
lastUpdated: false
editLink: false
prev:
  text: Changelog
  link: /en/changelogs/
next:
  text: Download
  link: /en/download/
---

<!-- markdownlint-disable-file -->

<script setup lang="ts">
import { useData } from 'vitepress'
import ChangelogByTag from '@theme/components/ChangelogByTag.vue'

const { page } = useData()
const tag = page.value.params.tag as string
</script>

<ChangelogByTag :tag="tag" />
