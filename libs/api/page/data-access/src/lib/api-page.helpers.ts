import { Domain, Page, PageBlock, PageBlockType, PageDomain, PageStatus, Prisma } from '@prisma/client'

export function parseUrl(url: string): { hostname: string; path: string } {
  if (!url?.length) {
    return null
  }
  // If url doesn't start with http:// or https://, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  try {
    let { hostname, pathname, port } = new URL(url)
    if (port) {
      hostname += ':' + port
    }
    return { hostname, path: pathname.replace('/', '') }
  } catch (e) {
    return null
  }
}

export type CoreDbPageDomain = PageDomain & {
  domain: Domain
}

export type CoreDbPage = Page & {
  domains: CoreDbPageDomain[]
  blocks: PageBlock[]
}

export type CorePageBlock = {
  id: string
  type: PageBlockType
  data: unknown
  order: number
}

export type CorePage = Pick<CoreDbPage, 'id' | 'title' | 'color' | 'description'> & {
  blocks: CorePageBlock[]
  urls: string[]
}

export function convertCoreDbPage(page: CoreDbPage): CorePage {
  const urls = page.domains.map(({ domain, path }) => {
    return `http${domain.secure ? 's' : ''}://${domain.name}/${path}`
  })

  page.createdAt = undefined
  page.updatedAt = undefined
  page.ownerId = undefined
  page.domains = undefined

  const blocks: CorePageBlock[] = page.blocks.map((block) => {
    return {
      id: block.id,
      type: block.type,
      data: block.data,
      order: block.order,
    }
  })
  return {
    ...page,
    blocks,
    urls: urls ?? [],
  }
}

export function createNewPage(input: Prisma.PageUncheckedCreateInput): Prisma.PageUncheckedCreateInput {
  return {
    status: PageStatus.Draft,
    ...input,
    blocks: {
      create: [{ type: PageBlockType.Header, data: { text: '## Hello, World!' } }],
    },
  }
}
