<script setup lang="ts">
import moment from 'moment'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import { data as releaseData } from '../data/release.data'

const { lang } = useData()
const isChinese = computed(() => lang.value.startsWith('zh'))
const momentInfo = computed(() => ({
  relative: moment(releaseData.release.published_at).fromNow(),
  exact: moment(releaseData.release.published_at).format('LLLL'),
  iso: releaseData.release.published_at ?? undefined,
}))
const show = ref(false)

onMounted(() => {
  show.value = true
})
</script>

<template>
  <a v-if="releaseData.isFallback" :href="releaseData.release.html_url">
    {{ isChinese ? 'GitHub Releases' : 'GitHub Releases' }}
  </a>
  <time v-else :datetime="momentInfo.iso" :title="momentInfo.exact">
    {{ show ? momentInfo.relative : momentInfo.exact }}
  </time>
</template>
