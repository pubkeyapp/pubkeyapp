import { Stack, useMantineTheme } from '@mantine/core'
import React from 'react'

export function UiFullPage({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme()
  return (
    <Stack h="100%" spacing={theme.spacing.lg}>
      {children}
    </Stack>
  )
}
