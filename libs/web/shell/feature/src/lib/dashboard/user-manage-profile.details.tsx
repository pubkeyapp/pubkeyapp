import { ActionIcon, Anchor, Avatar, Badge, Button, Group, Menu, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { IdentityBadge } from '@pubkeyapp/web/identity/ui'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  Profile,
  UserUpdateProfileInput,
  useUserGetIdentitiesQuery,
  useUserGetProfileQuery,
  useUserLinkProfileIdentityMutation,
  useUserSyncProfileMutation,
  useUserUnlinkProfileIdentityMutation,
  useUserUpdateProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconTrash, IconUser, IconUserExclamation, IconUserPlus } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { UserSelectAvatarModal } from './user-select-avatar-modal'

export function UserManageProfileDetails({ profile }: { profile: Profile }) {
  const { user } = useAuth()
  const [, updateProfileMutation] = useUserUpdateProfileMutation()
  const [, linkIdentityMutation] = useUserLinkProfileIdentityMutation()
  const [, unlinkIdentityMutation] = useUserUnlinkProfileIdentityMutation()

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

  const enabled = useMemo(() => {
    return user?.identities?.filter((identity) => profile.identities?.find((pId) => pId.id === identity.id))
  }, [user?.identities, profile])
  const identities = useMemo(() => {
    return user?.identities?.filter((identity) => !profile.identities?.find((pId) => pId.id === identity.id))
  }, [user?.identities, profile])

  return (
    <Stack>
      <Stack>
        <Group position="apart" align="start">
          <Group align="center">
            {user ? (
              <UserSelectAvatarModal
                size={64}
                radius="xl"
                avatarUrl={profile.avatar ?? ''}
                user={user}
                identities={profile.identities ?? user.identities ?? []}
                updateAvatar={(avatarUrl) => updateProfile({ avatar: avatarUrl })}
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
          {profile.page ? (
            <Group>
              <Button variant="outline" size="sm" component={Link} to={`/pages/${profile.page?.id}`}>
                Edit Page
              </Button>
              <Button variant="outline" size="sm" component={'a'} href={`${profile.page.viewUrl}`}>
                View Page
              </Button>
            </Group>
          ) : null}
        </Group>
      </Stack>
      <Stack spacing="xl" my={16}>
        <Group position="apart" align="center">
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
              <Menu.Dropdown>
                {identities?.map((identity) => (
                  <Menu.Item key={identity.id} onClick={() => addIdentity(identity.id!)}>
                    <Group position="center">
                      <IdentityBadge identity={identity} />
                    </Group>
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item component={Link} to="/dashboard/identities" color="brand">
                  <Group position="center">
                    <Badge>Manage Identities</Badge>
                  </Group>
                </Menu.Item>
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
