---
title: 最新更新日志
description: 最新 Koharia 正式版的更新日志。
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { data as releaseData } from '@theme/data/release.data'

const router = useRouter()
onMounted(() => {
  if (releaseData.isFallback) {
    window.location.assign(releaseData.release.html_url)
    return
  }

  router.go(`/zh/changelogs/${releaseData.release.tag_name}`)
})
</script>

# 正在跳转
