import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  JsonInput,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { AppType, useApps } from '@pubkeyapp/web/apps/data-access'
import { AppDashboard, GumLogo } from '@pubkeyapp/web/apps/ui'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { IdentityBadge, IdentityGrid } from '@pubkeyapp/web/identity/ui'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { ProfileIdentityCardContent, ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  AccountType,
  NetworkType,
  Profile,
  ProfileType,
  UserUpdateProfileInput,
  useUserCreatePageMutation,
  useUserLinkProfileIdentityMutation,
  useUserUnlinkProfileIdentityMutation,
  useUserUpdateProfileMutation,
  useUserVerifyProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconApps, IconDiscountCheck, IconTrash, IconUser } from '@tabler/icons-react'
import React, { ComponentType, useMemo } from 'react'
import { AccountIsNotVerified } from './account-is-not.verified'
import { AccountIsVerified } from './account-is.verified'
import { DashboardGumUserCreate } from './dashboard-gum-user.create'
import { UserEditProfileModal } from './user-edit-profile.modal'
import { UserSelectAvatarModal } from './user-select-avatar-modal'

export function UserManageProfileDetails({ profile, verifyUser }: { profile: Profile; verifyUser: () => void }) {
  const { apps } = useApps()
  const { user } = useAuth()
  const { createProfile } = useGumApp()
  const { refresh } = useUserProfiles()
  const [{ fetching: creatingPage }, createPageMutation] = useUserCreatePageMutation()
  const [, updateProfileMutation] = useUserUpdateProfileMutation()
  const [, linkIdentityMutation] = useUserLinkProfileIdentityMutation()
  const [, unlinkIdentityMutation] = useUserUnlinkProfileIdentityMutation()
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
        if (!res.data?.item) {
          showNotificationError('Profile not verified yet! ')
          return createProfile(profile.type!, user?.publicKey!, user?.gumUser?.address!)
            .then((res) => {
              if (!res) return showNotificationError('Profile not verified yet!')
              if (res) {
                showNotificationSuccess('Profile verified! ')
                return true
              }
              return false
            })
            .catch((err) => showNotificationError(err.message))
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
      if (app.id === AppType.GumProfile && profile.gumProfile) {
        app.itemId = profile?.gumProfile?.id
          ? `${profile.gumProfile.network}/${profile.gumProfile.address}/profile`
          : ''
      }
      return app
    })
    .filter((app) => app.itemId)

  return (
    <Stack>
      <Stack>
        <ProfileIdentityCardContent
          profile={profile}
          actions={<UserEditProfileModal profile={profile!} />}
          avatar={
            <UserSelectAvatarModal
              size={128}
              radius={128}
              profile={profile!}
              identities={profile.identities ?? []}
              updateAvatar={(avatarUrl) => updateProfile({ avatarUrl: avatarUrl })}
            />
          }
        />
      </Stack>
      <Stack spacing="xl" mt={16} sx={{}}>
        <Group position="apart" align="center">
          <UiIconBadge label="Apps" icon={IconApps} />
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
      <Stack spacing="xl" mt={16} sx={{}}>
        <Group position="apart" align="start">
          <UiIconBadge label="Linked Identities" icon={IconUser} />
        </Group>
        <IdentityGrid
          identities={enabled ?? []}
          addIdentity={() =>
            modals.open({
              title: <ProfileTypeBadge profileType={profile.type as ProfileType} verified={!!profile?.gumProfile} />,
              centered: true,
              children: (
                <Box>
                  {identities?.length ? (
                    <Stack align="center" spacing={32} mt={32}>
                      <Text size="xl">Link an identity to your {profile.type} profile</Text>
                      {identities?.map((identity) => (
                        <UnstyledButton
                          key={identity.id}
                          onClick={() => {
                            addIdentity(identity.id!)
                            modals.closeAll()
                          }}
                        >
                          <IdentityBadge identity={identity} />
                        </UnstyledButton>
                      ))}
                    </Stack>
                  ) : (
                    <Stack align="center" spacing={32} mt={32}>
                      <Text size="xl">All your identities are linked!</Text>
                    </Stack>
                  )}
                </Box>
              ),
            })
          }
          selectIdentity={(identity) =>
            modals.open({
              title: <IdentityBadge identity={identity} />,
              centered: true,
              children: (
                <Stack align="center">
                  <Tooltip label={`Unlink ${identity.provider} identity `}>
                    <Button
                      color="red"
                      variant="subtle"
                      onClick={() => {
                        removeIdentity(identity.id!)
                        modals.closeAll()
                      }}
                    >
                      <Group spacing={8}>
                        <IconTrash size={16} />
                        <Text>Remove Identity from Profile</Text>
                      </Group>
                    </Button>
                  </Tooltip>
                  {identity.profile ? (
                    <JsonInput
                      label="Profile Data"
                      readOnly
                      minRows={6}
                      value={JSON.stringify(identity.profile, null, 2)}
                    />
                  ) : null}
                </Stack>
              ),
            })
          }
        />
      </Stack>
      <Stack spacing="xl" mt={16} sx={{}}>
        <Group position="apart" align="start">
          <UiIconBadge label="Verification" icon={IconDiscountCheck} />
        </Group>
        <Box>
          {user?.gumUser ? (
            profile.gumProfile ? (
              <AccountIsVerified icon={<GumLogo width={128} />} account={profile.gumProfile} />
            ) : (
              <AccountIsNotVerified
                icon={<GumLogo width={128} />}
                type={AccountType.GumProfile}
                network={NetworkType.SolanaDevnet}
                onClick={() => verifyProfile()}
              />
            )
          ) : (
            <DashboardGumUserCreate />
          )}
        </Box>
      </Stack>
    </Stack>
  )
}

export function UiIconBadge({ label, icon: Icon }: { label: string; icon: ComponentType<{ size: number }> }) {
  return (
    <Badge
      size="lg"
      pl={0}
      color="brand"
      leftSection={
        <ThemeIcon color={'brand'} variant="transparent" size="lg" radius="xl">
          <Icon size={16} />
        </ThemeIcon>
      }
    >
      {label}
    </Badge>
  )
}
