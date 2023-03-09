import {
  Accordion,
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Group,
  SimpleGrid,
  Stack,
  ThemeIcon,
  Tooltip,
} from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { IdentityBadge, IdentityProviderLink, VerifiedBadge } from '@pubkeyapp/web/identity/ui'
import {
  showNotificationError,
  showNotificationSuccess,
  UiDebugModal,
  useAccordionStyles,
} from '@pubkeyapp/web/ui/core'
import {
  Identity,
  IdentityProvider,
  useUserDeleteIdentityMutation,
  useUserSyncProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
  IconTrash,
  IconUserPlus,
} from '@tabler/icons-react'
import React, { ComponentType } from 'react'

export function UserManageIdentities({ identities }: { identities: Identity[] }) {
  const { classes } = useAccordionStyles()

  const { user } = useAuth()
  return (
    <Stack spacing="xl">
      {identities?.length ? (
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
            {identities?.map((identity) => {
              return (
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
                    <UserIdentityItem key={identity.id} identity={identity} />
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion>
        </Box>
      ) : (
        <Alert>User has no linked identities</Alert>
      )}
    </Stack>
  )
}

export function UserIdentityItem({ identity }: { identity: Identity }) {
  const { user, refresh } = useAuth()

  const [, deleteIdentityMutation] = useUserDeleteIdentityMutation()

  const [{ fetching: loading }, syncProfileMutation] = useUserSyncProfileMutation()

  // const syncProfile = () => {
  //   syncProfileMutation({ profileId: `${profile.id}` })
  //   .then((res) => {
  //     console.log('res', res)
  //     if (res.error) {
  //       return showNotificationError(res.error.message)
  //     }
  //     if (!res.error && res.data?.item) {
  //       return showNotificationSuccess('Profile synced')
  //     }
  //     return false
  //   })
  //   .catch((err) => showNotificationError(err.message))
  // }

  const deleteIdentity = (id: string) => {
    const found = user?.identities?.find((identity) => identity.id === id)
    if (!found || !window.confirm(`Are you sure you want to delete ${found.provider} identity ${found.providerId}?`)) {
      return
    }
    deleteIdentityMutation({ identityId: found.id + '' })
      .then((res) => {
        refresh()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Profile updated')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Stack spacing={36}>
      <Group position="apart" px="xs">
        <IdentityProviderLink
          providerId={identity.providerId}
          provider={identity.provider as IdentityProvider}
          username={identity.profile?.username}
        />
        <Group>
          {identity.providerId !== user?.publicKey ? (
            <Tooltip label="Delete Identity">
              <ActionIcon color="red" onClick={() => deleteIdentity(identity.id!)}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          ) : null}
          <UiDebugModal data={identity} />
        </Group>
      </Group>

      {/*<Button loading={loading} variant="default" size="sm" onClick={syncProfile}>*/}
      {/*  Sync Profile*/}
      {/*</Button>*/}
    </Stack>
  )
}

export function CreateNewIdentity() {
  const items: { label: string; link: string; icon: ComponentType<{ size: number }> }[] = [
    {
      label: 'Twitter',
      link: '/api/auth/twitter',
      icon: IconBrandTwitter,
    },
    {
      label: 'Discord',
      link: '/api/auth/discord',
      icon: IconBrandDiscord,
    },
    {
      label: 'GitHub',
      link: '/api/auth/github',
      icon: IconBrandGithub,
    },
    {
      label: 'Google',
      link: '/api/auth/google',
      icon: IconBrandGoogle,
    },
  ]
  return (
    <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {items.map((item) => (
        <Button key={item.label} variant="subtle" component="a" href={item.label} leftIcon={<item.icon size={36} />}>
          Link {item.label}
        </Button>
      ))}
    </SimpleGrid>
  )
}
