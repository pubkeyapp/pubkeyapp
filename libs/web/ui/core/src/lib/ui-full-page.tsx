import { AppShell, Center, Stack, useMantineTheme } from '@mantine/core'
import React from 'react'

export function UiFullPage({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme()
  return (
    <AppShell>
      <Center h={'100%'}>
        <Stack spacing={theme.spacing.lg}>{children}</Stack>
      </Center>
    </AppShell>
  )
}
