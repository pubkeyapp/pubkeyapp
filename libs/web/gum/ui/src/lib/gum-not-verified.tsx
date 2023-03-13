import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { AccountType, NetworkType } from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheckFilled } from '@tabler/icons-react'
import React, { ReactNode, useState } from 'react'

export function GumNotVerified({
  network,
  type,
  onClick,
  icon,
  loading,
  more,
}: {
  network: NetworkType
  type: AccountType
  icon?: ReactNode
  loading?: boolean
  onClick: () => void
  more?: ReactNode
}) {
  const [showMore, setShowMore] = useState(false)
  const label = type.replace('Gum', 'Gum ')
  return (
    <Stack align="center" my={32} spacing={32}>
      <Text color="blue">{icon ? icon : <IconDiscountCheckFilled size={128} />}</Text>
      <Box>
        <Text size="lg">
          Please create your {label} account on {network?.replace('Solana', 'Solana ')}
        </Text>
      </Box>
      <Box>
        <Group>
          <Button loading={loading} onClick={onClick}>
            Create {label}
          </Button>
        </Group>
      </Box>
      {more ? (
        showMore ? (
          <Group position="center">
            <Box>{more}</Box>
            <Button variant="subtle" color="brand" onClick={() => setShowMore(false)}>
              Ok!
            </Button>
          </Group>
        ) : (
          <Button variant="subtle" color="brand" onClick={() => setShowMore(true)}>
            Learn more
          </Button>
        )
      ) : null}
    </Stack>
  )
}
