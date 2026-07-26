<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as changelogData } from '../data/changelogs.data'
import { formatChangelog } from '../utils/formatChangelog'
import Contributors from './Contributors.vue'

const { lang } = useData()
const isChinese = computed(() => lang.value.startsWith('zh'))
const changelogs = changelogData.releases
const prefix = computed(() => isChinese.value ? '/zh' : '/en')
const md = new MarkdownIt({ html: true })
const dateFormatter = computed(() => new Intl.DateTimeFormat(isChinese.value ? 'zh-CN' : 'en', { dateStyle: 'medium' }))

function renderMarkdown(body: string | null | undefined) {
  return formatChangelog(md, body, { stripChecksums: true })
}
</script>

<template>
  <div v-if="changelogData.isFallback" class="custom-block warning">
    <p class="custom-block-title">
      {{ isChinese ? '发布信息暂不可用' : 'Release information unavailable' }}
    </p>
    <p>
      <a href="https://github.com/Mister-album/Koharia/releases">{{ isChinese ? '在 GitHub Releases 查看正式版本。' : 'View official releases on GitHub Releases.' }}</a>
    </p>
  </div>
  <template v-else>
    <div v-for="(release, index) of changelogs" :key="release.tag_name">
      <h2 :id="index === 0 ? 'latest' : release.tag_name">
        <a :href="`${prefix}/changelogs/${release.tag_name}`">{{ release.tag_name }}</a>
        <Badge v-if="index === 0" type="tip" :text="isChinese ? '最新' : 'Latest'" />
      </h2>
      <time :datetime="release.published_at!">{{ dateFormatter.format(new Date(release.published_at!)) }}</time>
      <div v-html="renderMarkdown(release.body)" />
      <Contributors :body="release.body!" :author="release.author.login" :tag="release.tag_name" />
    </div>
  </template>
</template>

<style lang="stylus" scoped>
h2 {
  margin-bottom: 0
  display: flex
  align-items: center
  gap: 0.5rem
}

time {
  font-size: 0.875rem
  color: var(--vp-c-text-2)
}
</style>
