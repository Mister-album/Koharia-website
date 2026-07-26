<script setup lang="ts">
import { IconChevronRight } from '@iconify-prerendered/vue-mdi'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as newsList } from '../data/news.data'

const { lang } = useData()
const isChinese = computed(() => lang.value.startsWith('zh'))
const dateFormatter = computed(() => new Intl.DateTimeFormat(isChinese.value ? 'zh-CN' : 'en', { dateStyle: 'medium', timeZone: 'UTC' }))

function formatDate(date: string) {
  return dateFormatter.value.format(new Date(`${date.substring(0, 10)}T00:00:00Z`))
}
</script>

<template>
  <div v-if="newsList.length === 0" class="empty-news">
    <h2>{{ isChinese ? '暂无新闻' : 'No news yet' }}</h2>
    <p>{{ isChinese ? 'Koharia 的发布与项目进展将在这里公布。' : 'Koharia releases and project updates will appear here.' }}</p>
  </div>
  <article v-for="news of newsList" :key="news.url" class="news">
    <div>
      <h3><a :href="news.url"><span class="title">{{ news.title }}</span></a></h3>
      <time :datetime="news.date">{{ formatDate(news.date) }}</time>
    </div>
    <p>{{ news.description }}</p>
    <div class="readPrompt" aria-hidden="true">
      <span>{{ isChinese ? '阅读文章' : 'Read article' }}</span>
      <IconChevronRight />
    </div>
  </article>
</template>

<style lang="stylus" scoped>
.empty-news {
  margin: 3rem 0
  text-align: center
  color: var(--vp-c-text-2)
}

.news {
  display: flex
  flex-direction: column
  gap: 0.5rem
  margin-top: 3rem
}

.news h3,
.news p {
  margin: 0
}

.news time {
  color: var(--vp-c-text-2)
  font-size: 0.875rem
}

.readPrompt {
  display: flex
  align-items: center
  color: var(--vp-c-brand-1)
  font-weight: 500
}

.readPrompt svg {
  width: 1.25rem
  height: 1.25rem
}
</style>
