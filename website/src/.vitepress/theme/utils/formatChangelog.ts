import type MarkdownIt from 'markdown-it'

export interface ChangelogFormatOptions {
  locale?: ReleaseNotesLocale
  stripChecksums?: boolean
}

export type ReleaseNotesLocale = 'zh' | 'en'

const releaseNotesMarker = /<!--\s*koharia-release-notes:(zh|en|end)\s*-->/gi

/**
 * Select the requested language block and append everything after the end
 * marker as shared release notes. Bodies without Koharia markers are returned
 * unchanged for compatibility with older releases.
 */
export function localizeReleaseNotes(body: string | null | undefined, locale: ReleaseNotesLocale): string {
  if (!body)
    return body ?? ''

  const markers = [...body.matchAll(releaseNotesMarker)]
  if (!markers.some(marker => marker[1].toLowerCase() === 'zh' || marker[1].toLowerCase() === 'en'))
    return body

  const localizedSections: string[] = []
  let sharedSection = ''

  for (const [index, marker] of markers.entries()) {
    const name = marker[1].toLowerCase()
    const markerIndex = marker.index ?? 0
    const sectionStart = markerIndex + marker[0].length
    const sectionEnd = markers[index + 1]?.index ?? body.length
    const section = body.slice(sectionStart, sectionEnd).trim()

    if (name === locale && section)
      localizedSections.push(section)

    if (name === 'end') {
      sharedSection = body.slice(sectionStart).trim()
      break
    }
  }

  return [...localizedSections, sharedSection]
    .filter(Boolean)
    .join('\n\n')
}

function convertCallouts(md: MarkdownIt, input: string): string {
  return input.replace(
    /^> \[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]\r?\n((?:^>.*\r?\n?)+)/gim,
    (_match, typeRaw: string, block: string) => {
      const type = (typeRaw as string).toUpperCase()
      const map: Record<string, { cls: string, title: string }> = {
        TIP: { cls: 'tip', title: 'TIP' },
        NOTE: { cls: 'info', title: 'INFO' },
        IMPORTANT: { cls: 'warning', title: 'WARNING' },
        WARNING: { cls: 'warning', title: 'WARNING' },
        CAUTION: { cls: 'danger', title: 'DANGER' },
      }
      const { cls, title } = map[type] ?? map.TIP
      const text = block
        .split(/\r?\n/)
        .map((l: string) => l.replace(/^>\s?/, ''))
        .join('\n')
        .replace(/###\s*/, '')
        .trim()
      const inner = md.render(text).trim()
      return `\n\n<div class="${cls} custom-block"><p class="custom-block-title">${title}</p>${inner}</div>\n\n`
    },
  )
}

export function formatChangelog(md: MarkdownIt, body: string | null | undefined, options: ChangelogFormatOptions = {}): string {
  const base = body == null
    ? 'No changelog provided.'
    : options.locale
      ? localizeReleaseNotes(body, options.locale)
      : body
  const text = options.stripChecksums
    ? base.split(/---\r\n\r\n### Checksums|---\r\n\r\nMD5/)[0]
    : base

  const flavored = text
    .replace(/(?<=\(|(, ))@(.*?)(?=\)|(, ))/g, '[@$2](https://github.com/$2)')
    .replace(/#(\d+)/g, '[#$1](https://github.com/Mister-album/Koharia/issues/$1)')
    .replace(/\b([0-9a-f]{7,10})\b/gi, '[$1](https://github.com/Mister-album/Koharia/commit/$1)')
    .replace(/<!-->/g, '')
    .replace('https://github.com/Mister-album/Koharia/releases', '/changelogs/')
    .replace(/https:\/\/github.com\/Mister-album\/Koharia\/releases\/tag\/(.*)/g, '#$1')
    .trim()

  const withCallouts = convertCallouts(md, flavored)
  return md.render(withCallouts)
}
