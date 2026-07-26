<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref, toRefs } from 'vue'

const props = defineProps<{ body: string, author: string, tag: string }>()
const { body, author } = toRefs(props)
const { lang } = useData()

const nonExistent = ref<string[]>([])

const contributors = computed(() => {
  const list = [...body.value.matchAll(/(?<=\(|(, ))@(.*?)(?=\)|(, ))/g)]
    .map(match => match[2])
  const uncredited = author.value.includes('[bot]') ? [] : [author.value]

  return [...new Set([...uncredited, ...list])]
    .filter(user => !user.endsWith('[bot]'))
    .filter(user => !nonExistent.value.includes(user))
})

const listFormatter = computed(() => new Intl.ListFormat(lang.value.startsWith('zh') ? 'zh-CN' : 'en', {
  style: 'long',
  type: 'conjunction',
}))

const contributorsText = computed(() => {
  if (contributors.value.length <= 3)
    return listFormatter.value.format(contributors.value)

  return listFormatter.value.format([
    ...contributors.value.slice(0, 2),
    lang.value.startsWith('zh') ? `另 ${contributors.value.length - 2} 位贡献者` : `${contributors.value.length - 2} other contributors`,
  ])
})

function addToNonExistent(user: string) {
  if (!nonExistent.value.includes(user))
    nonExistent.value.push(user)
}
</script>

<template>
  <div v-if="contributors.length > 0" class="contributors">
    <h3>{{ lang.startsWith('zh') ? '贡献者' : 'Contributors' }}</h3>
    <ul>
      <li
        v-for="contributor of contributors"
        :key="contributor"
      >
        <a
          :href="`https://github.com/${contributor}`"
          target="_blank"
          :title="`${contributor} profile on GitHub`"
          :aria-label="`${contributor} profile on GitHub`"
        >
          <img
            :src="`https://github.com/${contributor}.png?size=32`"
            :alt="`@${contributor} profile picture`"
            loading="lazy"
            class="avatar"
            @error="addToNonExistent(contributor)"
          >
        </a>
      </li>
    </ul>
    <div class="names">
      {{ contributorsText }}
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.contributors {
  ul {
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 0.5rem
    list-style-type: none
    padding-left: 0

    li + li {
      margin-top: 0
    }
  }

  .avatar {
    width: 32px
    height: 32px
    border-radius: 50%
    box-shadow: var(--vp-shadow-1)
    border: 1px solid var(--vp-c-divider)
  }

  .names {
    font-size: 0.875rem
    color: var(--vp-c-text-2)
  }
}
</style>
