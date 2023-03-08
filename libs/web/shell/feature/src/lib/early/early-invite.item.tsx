import { Box, Code, Stack, Text } from '@mantine/core'
import { UiCopyButton } from '@pubkeyapp/web/ui/core'
import { Invite } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import TimeAgo from 'timeago-react'

export function EarlyInviteItem({ invite }: { invite: Invite }) {
  return (
    <Box key={invite.id} sx={{ padding: 16, marginBottom: 16 }}>
      <Stack align="center">
        <Text size="lg" weight="bold">
          <UiCopyButton
            disabled={Boolean(invite?.isExpired || invite?.isUsedUp)}
            text={invite.code + ''}
            label="Copy invite code"
          />
        </Text>

        <Text size="lg" color="dimmed">
          Invited users: {invite.useCount}/{(invite?.maxUses ?? 0) > 0 ? invite.maxUses : '∞'}
        </Text>
        <Box>
          {invite.expiresAt ? (
            invite.isExpired ? (
              <Code color="yellow">
                Expired <TimeAgo datetime={invite.expiresAt} />
              </Code>
            ) : (
              <Code color="green">
                Expires <TimeAgo datetime={invite.expiresAt} />
              </Code>
            )
          ) : (
            <Code color="green">No expiration</Code>
          )}
        </Box>
      </Stack>
    </Box>
  )
}
