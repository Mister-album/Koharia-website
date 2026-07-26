import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import process from 'node:process'

import { Octokit } from '@octokit/rest'
import { defineLoader } from 'vitepress'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

type GitHubReleaseList = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.listReleases>

export interface ChangelogsData {
  releases: GitHubReleaseList
  isFallback: boolean
}

declare const data: ChangelogsData
export { data }

const useDevelopmentFallback = process.env.NODE_ENV !== 'production' && !process.env.GITHUB_TOKEN

export default defineLoader({
  async load(): Promise<ChangelogsData> {
    if (useDevelopmentFallback) {
      return { releases: [], isFallback: true }
    }

    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: 'Mister-album',
      repo: 'Koharia',
      per_page: 100,
    })

    return { releases, isFallback: false }
  },
})
