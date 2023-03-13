import { Center, Text } from '@mantine/core'
import { Page } from '@pubkeyapp/sdk'
import { PageWrapper } from '@pubkeyapp/web/page/ui'
import { UiThemeProvider } from '@pubkeyapp/web/ui/theme'
import React from 'react'

// add the pubkey global variable
declare global {
  interface Window {
    pubkey: {
      page: Page
    }
  }
}
export function App() {
  // FIXME: Add fallback for when window.pubkey.page is undefined
  const page = window?.pubkey?.page

  return (
    <UiThemeProvider>
      <Center h="100vh">{page ? <PageWrapper page={page as any} /> : <Text>Error loading page...</Text>}</Center>
    </UiThemeProvider>
  )
}
