import { Box, Group, Stack } from '@mantine/core'
import { UiDebugModal } from '@pubkeyapp/web/ui/core'
import { LinkAccount } from '@pubkeyapp/web/account/ui'
import { GumProfileList } from './gum-profile-list'
import { GumUserDeleteButton } from './gum-user-delete-button'
import { GumUser } from './gum-interfaces'

export function GumUserItem({ user }: { user: GumUser }) {
  return (
    <Stack spacing="xl">
      <Box px="xl">
        <Group position="apart">
          <Group>
            <LinkAccount address={user?.publicKey} ellipsis />
            <UiDebugModal data={{ user }} />
          </Group>
          <Group position="right">
            <GumUserDeleteButton userAccount={user?.publicKey} />
          </Group>
        </Group>
      </Box>
      <Box px="lg">
        <GumProfileList user={user} />
      </Box>
    </Stack>
  )
}
