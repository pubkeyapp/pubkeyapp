import { ActionIcon, Anchor, Box, Code, Group, Modal, Stack, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PubKeyProfileBadge } from '@pubkeyapp/web/ui/core'
import { Account, User } from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheckFilled } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

export function PageUserVerifiedModal({ user }: { user?: User }) {
  const [opened, { open, close }] = useDisclosure(false)

  if (!user?.gumUser) return null
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <PubKeyProfileBadge label="Verified on PubKey" user={user} />
          </Group>
        }
        centered
        size="lg"
      >
        <AccountIsVerified account={user.gumUser} />
      </Modal>
      <Tooltip label={'Gum User Verified'}>
        <ActionIcon size="xs" variant="subtle" onClick={open}>
          <Text color={'blue'} sx={{ display: 'flex' }}>
            <IconDiscountCheckFilled size={16} />
          </Text>
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export function AccountIsVerified({ account }: { account: Account }) {
  return (
    <Stack align="center" my={32} spacing={32}>
      <Group position="center">
        <Text color="blue">
          <IconDiscountCheckFilled size={128} />
        </Text>
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
