import { ActionIcon, Anchor, Badge, Button, Group, Menu, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { AppType, useApps } from '@pubkeyapp/web/apps/data-access'
import { AppDashboard } from '@pubkeyapp/web/apps/ui'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { IdentityBadge } from '@pubkeyapp/web/identity/ui'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { showNotificationError, showNotificationSuccess, UiDebugModal } from '@pubkeyapp/web/ui/core'
import {
  Profile,
  UserUpdateProfileInput,
  useUserCreatePageMutation,
  useUserLinkProfileIdentityMutation,
  useUserSetDefaultProfileMutation,
  useUserUnlinkProfileIdentityMutation,
  useUserUpdateProfileMutation,
  useUserVerifyProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconApps, IconTrash, IconUser } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { UserEditProfileModal } from './user-edit-profile.modal'
import { UserSelectAvatarModal } from './user-select-avatar-modal'

export function UserManageProfileDetails({ profile }: { profile: Profile }) {
  const { apps } = useApps()
  const { user } = useAuth()
  const { refresh } = useUserProfiles()
  const [{ fetching: creatingPage }, createPageMutation] = useUserCreatePageMutation()
  const [, updateProfileMutation] = useUserUpdateProfileMutation()
  const [, linkIdentityMutation] = useUserLinkProfileIdentityMutation()
  const [, unlinkIdentityMutation] = useUserUnlinkProfileIdentityMutation()
  const [, setDefaultProfileMutation] = useUserSetDefaultProfileMutation()
  const [, verifyProfileMutation] = useUserVerifyProfileMutation()

  const createPage = () => {
    createPageMutation({ input: { profileId: profile.id } })
      .then((res) => {
        refresh()
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Page created! ')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const addIdentity = (id: string) => {
    linkIdentityMutation({ profileId: `${profile.id}`, identityId: id })
      .then((res) => {
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Identity linked ')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const removeIdentity = (id: string) => {
    unlinkIdentityMutation({ profileId: `${profile.id}`, identityId: id })
      .then((res) => {
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Identity linked ')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updateProfile = async (input: UserUpdateProfileInput) => {
    return updateProfileMutation({ profileId: `${profile.id}`, input })
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

  const setDefaultProfile = async () => {
    if (!window.confirm(`Are you sure you want to use ${profile.type} as your primary profile?`)) {
      return
    }
    return setDefaultProfileMutation({ profileId: `${profile.id}` })
      .then((res) => {
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Profile selected! ')
          return !!res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const enabled = useMemo(() => {
    return user?.identities?.filter((identity) => profile.identities?.find((pId) => pId.id === identity.id))
  }, [user?.identities, profile])
  const identities = useMemo(() => {
    return user?.identities?.filter((identity) => !profile.identities?.find((pId) => pId.id === identity.id))
  }, [user?.identities, profile])

  const verifyProfile = () => {
    verifyProfileMutation({ profileId: `${profile.id}` })
      .then((res) => {
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Profile verified! ')
          return !!res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const userApps = apps
    .map((app) => {
      if (app.id === AppType.PubKeyPages) {
        app.itemId = profile.page?.id ?? ''
      }
      return app
    })
    .filter((app) => app.itemId)

  return (
    <Stack>
      <Stack>
        <Group position="apart" align="start">
          <Group align="center">
            {user ? (
              <UserSelectAvatarModal
                size={64}
                radius="xl"
                profile={profile!}
                identities={profile.identities ?? user.identities ?? []}
                updateAvatar={(avatarUrl) => updateProfile({ avatarUrl: avatarUrl })}
              />
            ) : null}
            <Stack spacing={0}>
              <Text size="xl" fw={500}>
                {profile.name}
              </Text>
              <Anchor component={Link} to={`${profile.owner?.profileUrl}`} size="sm" color="brand">
                {profile.username}
              </Anchor>
            </Stack>
          </Group>
          <Group>
            <UserEditProfileModal profile={profile!} />
          </Group>
        </Group>
        <Group position="right" align="start">
          <Group>
            {user?.profile?.id === profile.id ? null : (
              <Tooltip label={`Use ${profile.type} as your primary profile on PubKey`}>
                <Button variant="outline" size="sm" onClick={() => setDefaultProfile()}>
                  Use as Primary
                </Button>
              </Tooltip>
            )}
            <Tooltip label={`Verify ${profile.type} profile`}>
              <Button variant="outline" size="sm" onClick={verifyProfile}>
                Verify Profile
              </Button>
            </Tooltip>
          </Group>
        </Group>
      </Stack>
      <Stack spacing="xl" my={16}>
        <Group position="apart" align="center">
          <Stack>
            <Badge
              size="lg"
              pl={0}
              color="brand"
              leftSection={
                <ThemeIcon color={'brand'} variant="transparent" size="lg" radius="xl">
                  <IconApps size={16} />
                </ThemeIcon>
              }
            >
              Apps
            </Badge>
          </Stack>
        </Group>
        {!profile.page ? (
          <Group>
            <Button loading={creatingPage} variant="outline" size="sm" onClick={() => createPage()}>
              Create PubKey Page
            </Button>
          </Group>
        ) : null}

        <AppDashboard apps={userApps} />
      </Stack>
      <Stack spacing="xl" my={16}>
        <Group position="apart" align="start">
          <Badge
            size="lg"
            pl={0}
            color="brand"
            leftSection={
              <ThemeIcon color={'brand'} variant="transparent" size="lg" radius="xl">
                <IconUser size={16} />
              </ThemeIcon>
            }
          >
            Linked Identities
          </Badge>
          <Group>
            <Menu shadow="md" width={300} withArrow>
              <Menu.Target>
                <Button size="sm" variant="outline">
                  Link Identity
                </Button>
              </Menu.Target>
              <Menu.Dropdown style={{ zIndex: 9999999 }}>
                {identities?.map((identity) => (
                  <Menu.Item key={identity.id} onClick={() => addIdentity(identity.id!)}>
                    <Group position="center">
                      <IdentityBadge identity={identity} />
                    </Group>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        {enabled?.map((identity) => (
          <Group key={identity.id} position="apart">
            <IdentityBadge identity={identity} />
            <Tooltip label={`Unlink ${identity.provider} identity `}>
              <ActionIcon color="red" onClick={() => removeIdentity(identity.id!)}>
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ))}
      </Stack>
    </Stack>
  )
}
