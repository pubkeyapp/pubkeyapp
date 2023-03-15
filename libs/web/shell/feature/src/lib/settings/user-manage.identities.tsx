import { Accordion, Alert, Badge, Box, Group, Stack, ThemeIcon, Tooltip } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { IdentityBadge, VerifiedBadge } from '@pubkeyapp/web/identity/ui'
import { UiLoader, useAccordionStyles } from '@pubkeyapp/web/ui/core'
import { IconUserPlus } from '@tabler/icons-react'
import { CreateNewIdentity } from './create-new.identity'
import { useUserIdentities } from './user-identities.provider'
import { UserIdentityPanel } from './user-identity.panel'

export function UserManageIdentities() {
  const { user } = useAuth()
  const { items, loading } = useUserIdentities()
  const { classes } = useAccordionStyles()

  if (loading) {
    return <UiLoader />
  }

  return (
    <Stack spacing="xl">
      {items?.length ? (
        <Box>
          <Accordion mx="auto" variant="filled" defaultValue={'link'} classNames={classes} className={classes.root}>
            <Accordion.Item value={'link'} key={'link'}>
              <Accordion.Control>
                <Group align="center">
                  <Badge
                    size="lg"
                    pl={0}
                    color="brand"
                    leftSection={
                      <ThemeIcon color={'brand'} variant="transparent" size="lg" radius="xl">
                        <IconUserPlus size={16} />
                      </ThemeIcon>
                    }
                  >
                    Link Identity
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Box mt={16} mb={32}>
                  <CreateNewIdentity />
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
            {items?.map((identity) => (
              <Accordion.Item value={identity.id + ''} key={identity.id}>
                <Accordion.Control>
                  <Group position="apart" align="center">
                    <IdentityBadge identity={identity} />
                    <Group spacing={8}>
                      {identity.providerId === user?.publicKey ? (
                        <Tooltip label="Your default identity is used to log in to PubKey">
                          <Badge color="gray">Default Identity</Badge>
                        </Tooltip>
                      ) : null}
                      {identity.verified ? <VerifiedBadge /> : <Badge color="yellow">Not verified</Badge>}
                    </Group>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <UserIdentityPanel key={identity.id} identity={identity} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      ) : (
        <Alert>User has no linked identities</Alert>
      )}
    </Stack>
  )
}
