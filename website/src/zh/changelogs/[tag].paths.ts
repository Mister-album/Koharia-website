import process from 'node:process'

import { Octokit } from '@octokit/rest'

const useDevelopmentFallback = process.env.NODE_ENV !== 'production' && !process.env.GITHUB_TOKEN

export default {
  async paths() {
    if (useDevelopmentFallback)
      return []

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: 'Mister-album',
      repo: 'Koharia',
      per_page: 100,
    })
    return releases.filter(release => !!release.tag_name).map(release => ({ params: { tag: release.tag_name } }))
  },
}
