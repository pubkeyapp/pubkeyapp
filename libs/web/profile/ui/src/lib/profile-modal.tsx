import { Button, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import children = ReactMarkdown.propTypes.children

export function ProfileModal({ context, id, innerProps }: ContextModalProps<{ children: ReactNode }>) {
  return <>{children}</>
}
