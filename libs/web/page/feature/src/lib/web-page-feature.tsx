import { Anchor, Center, Code, Flex, Stack } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { Page, PubKeySdk } from '@pubkeyapp/sdk'
import { PageUiRender } from '@pubkeyapp/web/page/ui'
import { useConfig } from '@pubkeyapp/web/shell/data-access'
import { UiError, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

export function WebPageRouter() {
  return (
    <Routes>
      <Route path="preview" element={<WebPageFeature />} />
    </Routes>
  )
}
export function WebPageFeature() {
  const { pageId } = useParams<{ pageId: string }>()
  const { apiUrl } = useConfig()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  const [page, setPage] = useState<Page | undefined>(undefined)

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('__session='))
    ?.split('=')[1]

  useEffect(() => {
    setLoading(true)
    setError(undefined)

    PubKeySdk.setup({ endpoint: apiUrl!, token })
      .then((sdk) => sdk.getPageById(pageId + ''))
      .then((page) => {
        setPage(page)
        setLoading(false)
      })
      .catch((e) => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return (
    <UiErrorLoader error={error} loading={loading}>
      <Center h="100vh">{page ? <WebPageWrapper page={page} /> : <UiError title="Page not found" />}</Center>
    </UiErrorLoader>
  )
}

export function WebPageWrapper({ page }: { page: Page }) {
  return (
    <Flex direction="column" justify="space-between" h={'100%'}>
      <Stack spacing={64} sx={{ overflow: 'auto' }}>
        <PageUiRender page={page} />
      </Stack>
      <Stack spacing={'xl'} mt="xl" mb={54}>
        <Center>
          {page?.owner?.pid ? <Code>{page.owner.pid}</Code> : null}
          <Anchor component="a" href={`${page.siteUrl}`}>
            <PubKeyLogo size={32} />
          </Anchor>
        </Center>
      </Stack>
    </Flex>
  )
}
