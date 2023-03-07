import { Anchor, Center, Flex, Stack, Text } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { Page } from '@pubkeyapp/sdk'
import { PageUiRender } from '@pubkeyapp/web/page/ui'
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
      <Center h="100vh">{page ? <WebPageWrapper page={page} /> : <Text>Error loading page...</Text>}</Center>
    </UiThemeProvider>
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
          <Anchor component="a" href={`${page.siteUrl}`}>
            <PubKeyLogo size={32} />
          </Anchor>
        </Center>
      </Stack>
    </Flex>
  )
}
