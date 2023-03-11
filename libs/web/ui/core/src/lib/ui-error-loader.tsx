import { Center } from '@mantine/core'
import React, { ReactNode } from 'react'
import { UiError } from './ui-error'
import { UiLoader } from './ui-loader'

export function UiErrorLoader({
  children,
  error,
  loading,
}: {
  children: ReactNode
  error?: unknown
  loading?: boolean
}) {
  if (loading) {
    return (
      <Center h="100%">
        <UiLoader />
      </Center>
    )
  }
  if (error) {
    return (
      <Center h="100%">
        <UiError error={error} />
      </Center>
    )
  }
  return <>{children}</>
}
