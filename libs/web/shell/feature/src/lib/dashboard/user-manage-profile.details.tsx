import { ActionIcon, Anchor, Badge, Button, Group, Menu, Modal, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { IdentityBadge } from '@pubkeyapp/web/identity/ui'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { showNotificationError, showNotificationSuccess, UiDebug } from '@pubkeyapp/web/ui/core'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import {
  Profile,
  ProfileType,
  UserUpdateProfileInput,
  useUserCreatePageMutation,
  useUserLinkProfileIdentityMutation,
  useUserSetDefaultProfileMutation,
  useUserUnlinkProfileIdentityMutation,
  useUserUpdateProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconPageBreak, IconTrash, IconUser } from '@tabler/icons-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserSelectAvatarModal } from './user-select-avatar-modal'

export function UserManageProfileDetails({ profile }: { profile: Profile }) {
  const { user } = useAuth()
  const { refresh } = useUserProfiles()
  const [{ fetching: creatingPage }, createPageMutation] = useUserCreatePageMutation()
  const [, updateProfileMutation] = useUserUpdateProfileMutation()
  const [, linkIdentityMutation] = useUserLinkProfileIdentityMutation()
  const [, unlinkIdentityMutation] = useUserUnlinkProfileIdentityMutation()
  const [, setDefaultProfileMutation] = useUserSetDefaultProfileMutation()

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
    if (!window.confirm(`Are you sure you want to make ${profile.type} your default profile?`)) {
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
            {user?.profile?.id === profile.id ? null : (
              <Tooltip label="Your default profile">
                <Button variant="subtle" size="sm" onClick={() => setDefaultProfile()}>
                  Make Default
                </Button>
              </Tooltip>
            )}
            <UserEditProfileModal profile={profile!} />
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
                  <IconPageBreak size={16} />
                </ThemeIcon>
              }
            >
              Profile Page
            </Badge>
          </Stack>
          <Group>
            {profile.page ? (
              <Button variant="outline" size="sm" component={Link} to={`/pages/${profile.page?.id}`}>
                Manage Page
              </Button>
            ) : (
              <Button loading={creatingPage} variant="outline" size="sm" onClick={() => createPage()}>
                Create Page
              </Button>
            )}
          </Group>
        </Group>
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

export function UserEditProfileModal({ profile }: { profile: Profile }) {
  const [item, setItem] = useState<Profile>(profile)
  const [opened, { open, close }] = useDisclosure(false)
  const [, updateProfileMutation] = useUserUpdateProfileMutation()
  function updateProfile(input: UserUpdateProfileInput) {
    return updateProfileMutation({ profileId: profile.id!, input })
      .then((res) => {
        modals.closeAll()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          setItem(res.data.item)
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <ProfileTypeBadge profileType={profile.type as ProfileType} />
            <Text size="lg">Edit Profile</Text>
          </Group>
        }
        centered
        size="lg"
      >
        <ProfileForm profile={item} updateProfile={updateProfile} />
      </Modal>

      <Group position="center">
        <Tooltip label={`Edit ${profile.type} profile`}>
          <Button variant="outline" size="sm" onClick={open}>
            Edit Profile
          </Button>
        </Tooltip>
      </Group>
    </>
  )
}

export function ProfileForm({
  profile,
  updateProfile,
}: {
  profile: Profile
  updateProfile: (input: Partial<UserUpdateProfileInput>) => Promise<boolean | undefined>
}) {
  const fields: UiFormField<UserUpdateProfileInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('username', { label: 'Username' }),
    formFieldTextarea('bio', { label: 'Bio' }),
  ]

  return (
    <UiForm<UserUpdateProfileInput>
      fields={fields}
      model={{ ...profile }}
      submit={(input) =>
        updateProfile(input).then(() => {
          modals.closeAll()
          return true
        })
      }
    >
      <Button type="submit">Save</Button>
    </UiForm>
  )
}
