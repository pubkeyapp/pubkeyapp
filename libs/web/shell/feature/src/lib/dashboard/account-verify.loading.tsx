import { Box, Stack, Text } from '@mantine/core'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { AccountType, NetworkType } from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheck } from '@tabler/icons-react'
import React, { ReactNode } from 'react'

export function AccountVerifyLoading({
  network,
  type,
  icon,
  verb,
}: {
  network: NetworkType
  type: AccountType
  icon?: ReactNode
  verb: string
}) {
  const label = type.replace('Gum', 'Gum ')
  return (
    <Stack align="center" my={32} spacing={32}>
      <Text color="grey">{icon ? icon : <IconDiscountCheck size={128} />}</Text>
      <Box>
        <Text size="lg">
          {verb ? verb : 'Verifying'} your {label} account on {network?.replace('Solana', 'Solana ')}
        </Text>
      </Box>
      <UiLoader />
    </Stack>
  )
}
