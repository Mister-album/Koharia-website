---
title: Latest changelog
description: Release notes for the latest stable Koharia version.
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

  router.go(`/en/changelogs/${releaseData.release.tag_name}`)
})
</script>

# Redirecting
