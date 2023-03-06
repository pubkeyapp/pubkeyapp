import { Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { ReactNode } from 'react'

export function UiError({ children, error, title }: { children?: ReactNode; error?: unknown; title?: string }) {
  return (
    <Alert icon={<IconAlertCircle size={16} />} title={title ?? 'Something went wrong...'} color="red">
      {error ? (typeof error === 'string' ? error : error?.toString() ?? 'Unknown error') : null}
      {children ? <>{children}</> : null}
    </Alert>
  )
}
