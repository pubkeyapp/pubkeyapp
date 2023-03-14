import { Button, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import React from 'react'

export function IdentityAddModal({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) {
  return (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
    </>
  )
}
