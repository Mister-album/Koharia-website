---
outline: false
lastUpdated: false
editLink: false
prev:
  text: 更新日志
  link: /zh/changelogs/
next:
  text: 下载
  link: /zh/download/
---

<!-- markdownlint-disable-file -->

<script setup lang="ts">
import { useData } from 'vitepress'
import ChangelogByTag from '@theme/components/ChangelogByTag.vue'

const { page } = useData()
const tag = page.value.params.tag as string
</script>

<ChangelogByTag :tag="tag" />
