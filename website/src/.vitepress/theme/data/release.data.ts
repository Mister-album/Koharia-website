import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import process from 'node:process'

import { Octokit } from '@octokit/rest'
import { defineLoader } from 'vitepress'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

type GitHubRelease = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.getLatestRelease>

export interface AppRelease {
  release: GitHubRelease
  isFallback: boolean
}

declare const data: AppRelease
export { data }

const fallbackRelease = {
  tag_name: 'latest',
  html_url: 'https://github.com/Mister-album/Koharia/releases',
  published_at: null,
  assets: [],
} as GitHubRelease

const useDevelopmentFallback = process.env.NODE_ENV !== 'production' && !process.env.GITHUB_TOKEN

export default defineLoader({
  async load(): Promise<AppRelease> {
    if (useDevelopmentFallback) {
      console.warn('GitHub release data is unavailable without GITHUB_TOKEN during local development; using the releases-page fallback.')
      return { release: fallbackRelease, isFallback: true }
    }

    const { data: release } = await octokit.repos.getLatestRelease({
      owner: 'Mister-album',
      repo: 'Koharia',
    })

    return { release, isFallback: false }
  },
})
