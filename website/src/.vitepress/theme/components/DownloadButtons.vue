<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import { data as releaseData } from '../data/release.data'

const { lang } = useData()
const isChinese = computed(() => lang.value.startsWith('zh'))
const isAndroid = ref(true)
const release = computed(() => releaseData.release)
const universalApk = computed(() => {
  const tag = release.value.tag_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return release.value.assets.find(asset =>
    new RegExp(`^Koharia-${tag}-release\\.apk$`, 'i').test(asset.name),
  )
})
const downloadUrl = computed(() => universalApk.value?.browser_download_url ?? release.value.html_url)

onMounted(() => {
  isAndroid.value = /android/i.test(navigator.userAgent)
})
</script>

<template>
  <div>
    <div v-if="!isAndroid" class="custom-block warning">
      <p class="custom-block-title">
        {{ isChinese ? '仅支持 Android' : 'Android only' }}
      </p>
      <p>
        {{ isChinese
          ? 'Koharia 是 Android 阅读器。请使用 Android 设备下载和安装。'
          : 'Koharia is an Android reader. Download and install it on an Android device.' }}
      </p>
    </div>
    <div class="download-buttons">
      <a
        class="download-button primary"
        :download="universalApk?.name"
        :href="downloadUrl"
      >
        <IconDownload />
        <span class="text">{{ isChinese ? '下载 Koharia' : 'Download Koharia' }}</span>
        <span v-if="!releaseData.isFallback" class="version">{{ release.tag_name }}</span>
      </a>
    </div>
    <p v-if="!universalApk" class="release-fallback">
      {{ isChinese ? '未找到通用 APK，已跳转至 GitHub Release 页面。' : 'No universal APK was found; this link opens the GitHub Release page.' }}
    </p>
    <span class="version-disclaimer">
      {{ isChinese ? '需要 Android 8.0 或更高版本。' : 'Requires Android 8.0 or later.' }}
    </span>
  </div>
</template>

<style lang="stylus">
.download-buttons {
  display: flex
  justify-content: center
  margin: 0.75em auto
}

.download-button {
  display: inline-block
  border: 1px solid var(--vp-button-brand-border)
  border-radius: 20px
  color: var(--vp-button-brand-text)
  background-color: var(--vp-button-brand-bg)
  padding: 0 20px
  line-height: 38px
  font-size: 14px
  font-weight: 600

  &:hover {
    color: var(--vp-button-brand-hover-text)
    background-color: var(--vp-button-brand-hover-bg)
    text-decoration: none !important
  }

  svg {
    margin-right: 0.5em
    vertical-align: middle
  }

  .text {
    margin-right: 10px
  }

  .version {
    font-size: 0.8em
  }
}

.version-disclaimer,
.release-fallback {
  display: block
  margin: 0.75em auto
  text-align: center
  font-size: 0.75rem
  color: var(--vp-c-text-2)
}
</style>
