import { Accordion, Alert, Anchor, Avatar, Box, Button, Container, Group, Paper, Stack, Text } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { ProfileCreateButton, ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { showNotificationError, showNotificationSuccess, UiLoader } from '@pubkeyapp/web/ui/core'
import {
  Profile,
  ProfileType,
  usePublicUserQuery,
  useUserProfilesQuery,
  useUserSyncProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAccordionStyles } from '../../../../../page-editor/feature/src/lib/web-page-editor-publish-tab'
import { EarlyFeatureActions } from '../early/early-feature'
import { DashboardIdentities } from './dashboard.identities'

export function DashboardFeature() {
  const { user } = useAuth()
  const [{ data: userData }] = usePublicUserQuery({ variables: { username: `${user?.username}` } })
  const [{ data: profiles, fetching }] = useUserProfilesQuery()

  return (
    <Box>
      <Container size="sm">
        <Stack spacing={64}>
          {fetching ? (
            <UiLoader />
          ) : profiles?.items?.length ? (
            <ProfileList profiles={profiles.items} />
          ) : (
            <Alert color="yellow" title="No profiles found">
              Create a profile to start building your page
            </Alert>
          )}

          <Paper>
            <Stack>
              <Group position="apart">
                <Text size="xl" fw={500}>
                  Your Identities
                </Text>

                <Button size="xs" variant="subtle" component={Link} to="/settings/identities">
                  Manage Identities
                </Button>
              </Group>
              <DashboardIdentities identities={userData?.item?.identities ?? []} />
            </Stack>
          </Paper>
        </Stack>
      </Container>
      <Box my={64}>
        <EarlyFeatureActions />
      </Box>
    </Box>
  )
}

export function ProfileList({ profiles }: { profiles: Profile[] }) {
  const { classes } = useAccordionStyles()
  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]

  return (
    <Stack spacing="xl">
      <Box>
        <Accordion mx="auto" variant="filled" defaultValue={types[0]} classNames={classes} className={classes.root}>
          {types.map((type) => {
            const found = profiles.find((p) => p.type === type)
            return (
              <Accordion.Item value={type} key={type}>
                <Accordion.Control>
                  <ProfileTypeBadge profileType={type} />
                </Accordion.Control>
                <Accordion.Panel>
                  <Box key={type} p="xs" pt={0}>
                    <Stack>
                      {found ? (
                        <Stack>
                          <ProfileDetails profile={found} />
                        </Stack>
                      ) : (
                        <Group position="center">
                          <ProfileCreateButton type={type} />
                        </Group>
                      )}
                    </Stack>
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Box>
    </Stack>
  )
}

export function ProfileDetails({ profile }: { profile: Profile }) {
  const [{ fetching: loading }, syncProfileMutation] = useUserSyncProfileMutation()
  const syncProfile = () => {
    syncProfileMutation({ profileId: `${profile.id}` })
      .then((res) => {
        console.log('res', res)
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Profile synced')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  return (
    <Stack>
      <Stack>
        <Group position="apart" align="start">
          <Group align="center">
            <Avatar size={36} src={profile.avatar} radius="xl" />
            <Stack spacing={0}>
              <Text size="xl" fw={500}>
                {profile.name}
              </Text>
              <Anchor component={Link} to={`${profile.owner?.profileUrl}`} size="sm" color="brand">
                {profile.username}
              </Anchor>
            </Stack>
          </Group>
          <Button loading={loading} variant="default" size="sm" onClick={syncProfile}>
            Sync Profile
          </Button>
        </Group>
      </Stack>
      <Box>
        <Group position="center">
          {profile.page ? (
            <Group>
              <Button variant="default" size="sm" component={Link} to={`/pages/${profile.page?.id}`}>
                Edit Page
              </Button>
              <Button variant="default" size="sm" component={'a'} href={`${profile.page.viewUrl}`}>
                View Page
              </Button>
            </Group>
          ) : null}
        </Group>
      </Box>
    </Stack>
  )
}
