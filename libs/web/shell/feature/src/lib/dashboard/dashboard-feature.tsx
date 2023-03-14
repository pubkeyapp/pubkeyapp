import { Box, Button, Container, Group, Paper, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UserProfilesProvider } from '@pubkeyapp/web/profile/data-access'
import { SearchBox } from '@pubkeyapp/web/search/ui'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  UserUpdateProfileInput,
  useUserUpdateProfileMutation,
  useUserVerifyUserMutation,
} from '@pubkeyapp/web/util/sdk'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserIdentitiesProvider } from '../settings/user-identities.provider'
import { UserManageIdentities } from '../settings/user-manage.identities'
import { DashboardGumUserCreate } from './dashboard-gum-user.create'
import { UserManageProfiles } from './user-manage.profiles'
import { UserUsernameModal } from './user-username.modal'

export function DashboardFeature() {
  const { user, refresh } = useAuth()
  const [, verifyUserMutation] = useUserVerifyUserMutation()
  const [, updateProfileMutation] = useUserUpdateProfileMutation()

  const verifyUser = async (alert = true): Promise<boolean> => {
    return verifyUserMutation({})
      .then((res) => {
        if (res.error) {
          if (alert) {
            showNotificationError(res.error.message)
          }
          return false
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('User verified!')
          refresh()
          return true
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updateProfile = async (input: UserUpdateProfileInput) => {
    if (!user?.profile) {
      console.log('No profile found')
      return false
    }
    return updateProfileMutation({ profileId: `${user?.profile?.id}`, input })
      .then((res) => {
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Profile updated! ')
          return !!res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Stack py={32} spacing={64}>
      <Group position="center">
        <SearchBox />
      </Group>
      <Box>
        <Container size="sm">
          <Stack spacing={64}>
            <Group position="center">{user ? <UserUsernameModal user={user} /> : null}</Group>
            {user?.gumUser ? null : (
              // user?.profile ? (
              //   <ProfileIdentityCard
              //     radius="xl"
              //     profile={user.profile}
              //     avatar={
              //       <UserSelectAvatarModal
              //         size={128}
              //         radius={128}
              //         profile={user.profile!}
              //         identities={user.profile?.identities ?? []}
              //         updateAvatar={(avatarUrl) => updateProfile({ avatarUrl: avatarUrl })}
              //       />
              //     }
              //     actions={<UserEditProfileModal profile={user.profile} />}
              //   />
              // ) : null
              <Paper>
                <DashboardGumUserCreate />
                <Button onClick={() => verifyUser()}>Verify</Button>
              </Paper>
            )}
            <UserProfilesProvider>
              <UserManageProfiles verifyUser={verifyUser} />
            </UserProfilesProvider>
            <UserIdentitiesProvider>
              <UserManageIdentities />
            </UserIdentitiesProvider>
          </Stack>
        </Container>
      </Box>
      <Group mt={64} position="center">
        <Button size="xs" variant="subtle" component={Link} to="/early">
          You're early.
        </Button>
      </Group>
    </Stack>
  )
}
