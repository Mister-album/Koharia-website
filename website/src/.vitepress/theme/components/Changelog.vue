<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as releaseData } from '../data/release.data'
import { formatChangelog } from '../utils/formatChangelog'
import Contributors from './Contributors.vue'

const { lang } = useData()
const isChinese = computed(() => lang.value.startsWith('zh'))
const md = new MarkdownIt({ html: true })
const changelog = computed(() => formatChangelog(md, releaseData.release.body))
const prefix = computed(() => isChinese.value ? '/zh' : '/en')
</script>

<template>
  <template v-if="releaseData.isFallback">
    <div class="custom-block warning">
      <p class="custom-block-title">
        {{ isChinese ? '发布信息暂不可用' : 'Release information unavailable' }}
      </p>
      <p>
        <a :href="releaseData.release.html_url">{{ isChinese ? '在 GitHub Releases 查看正式版本。' : 'View official releases on GitHub Releases.' }}</a>
      </p>
    </div>
  </template>
  <template v-else>
    <div class="changelog">
      <header><IconNewspaperVariant /><h2>{{ isChinese ? '更新日志' : 'Changelog' }}</h2></header>
      <div v-html="changelog" />
      <Contributors
        :body="releaseData.release.body!"
        :author="releaseData.release.author.login"
        :tag="releaseData.release.tag_name"
      />
    </div>
    <div class="fullChangelog">
      <p><a :href="`${prefix}/changelogs/${releaseData.release.tag_name}`">{{ isChinese ? '查看完整发布说明' : 'View the full release notes' }}</a></p>
    </div>
  </template>
</template>

<style lang="stylus">
.changelog {
  border: 1px solid var(--vp-c-bg-soft)
  border-radius: 12px
  background-color: var(--vp-c-bg-soft)
  padding: 24px
  margin: 1.5em auto 0.5em

  header {
    display: flex
    justify-content: center
    align-items: baseline
    gap: 0.5rem
  }

  h2 {
    margin: 0
    padding: 0
    border: none
  }
}

.fullChangelog {
  text-align: center
}
</style>
