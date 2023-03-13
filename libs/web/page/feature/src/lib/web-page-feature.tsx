import { Center } from '@mantine/core'
import { PubKeySdk } from '@pubkeyapp/sdk'
import { PageWrapper } from '@pubkeyapp/web/page/ui'
import { useConfig } from '@pubkeyapp/web/shell/data-access'
import { UiError, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { Page } from '@pubkeyapp/web/util/sdk'
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
        setPage(page as Page)
        setLoading(false)
      })
      .catch((e) => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return (
    <UiErrorLoader error={error} loading={loading}>
      <Center mih="100vh">{page ? <PageWrapper page={page} /> : <UiError title="Page not found" />}</Center>
    </UiErrorLoader>
  )
}
