import { Alert, Box, Code, Paper, Stack, useMantineTheme } from '@mantine/core'
import { AdminUiUserLink } from '@pubkeyapp/web/admin/ui'
import { UiPageHeaderTitle } from '@pubkeyapp/web/ui/page'
import { Invite } from '@pubkeyapp/web/util/sdk'

export function AdminInviteOverviewTab({ invite }: { invite: Invite }) {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Paper>
        <Stack spacing={theme.spacing.lg}>
          <UiPageHeaderTitle title="Inviter" />
          {invite.owner ? <AdminUiUserLink user={invite.owner} /> : null}
          <UiPageHeaderTitle title="Expires" />
          <Box>{invite.expiresAt ? <Code color="brand">{invite.expiresAt}</Code> : <Code color="red">Never</Code>}</Box>
          <UiPageHeaderTitle
            title={`Invited users: ${invite.useCount}/${(invite?.maxUses ?? 0) > 0 ? invite.maxUses : '∞'}`}
          />
          {!invite?.users?.length ? (
            <Alert color={'brand'}>No user invited yet.</Alert>
          ) : (
            invite?.users?.map((user) => <AdminUiUserLink key={user.id} user={user} />)
          )}
        </Stack>
      </Paper>
    </Stack>
  )
}
