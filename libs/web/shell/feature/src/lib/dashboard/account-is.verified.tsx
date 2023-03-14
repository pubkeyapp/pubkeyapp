import { Anchor, Box, Code, Group, Stack, Text } from '@mantine/core'
import { Account } from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheckFilled } from '@tabler/icons-react'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AccountIsVerified({ account, icon }: { account: Account; icon?: ReactNode }) {
  return (
    <Stack align="center" my={32} spacing={32}>
      <Group position="center">
        {icon ? (
          icon
        ) : (
          <Text color="blue">
            <IconDiscountCheckFilled size={128} />
          </Text>
        )}
      </Group>
      <Stack align="center">
        <Box>
          <Text size="lg">
            This {account.type?.replace('Gum', 'Gum ')} is verified on {account?.network?.replace('Solana', 'Solana ')}
          </Text>
        </Box>
        <Anchor component={Link} to={`/account/${account.address}?cluster=${account?.network?.replace('Solana', '')}`}>
          <Code color="brand">{account.address}</Code>
        </Anchor>
      </Stack>
    </Stack>
  )
}
