import { Button, Group, Modal, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { formFieldCheckbox, formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { UserProfileBadge } from '@pubkeyapp/web/user/ui'
import {
  Profile,
  ProfileType,
  UserUpdateProfileInput,
  useUserSetDefaultProfileMutation,
  useUserUpdateProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import React, { useState } from 'react'

export function UserEditProfileModal({ profile }: { profile: Profile }) {
  const [item, setItem] = useState<Profile>(profile)
  const [opened, { open, close }] = useDisclosure(false)
  const [, updateProfileMutation] = useUserUpdateProfileMutation()
  const [, setDefaultProfileMutation] = useUserSetDefaultProfileMutation()
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

  function updateProfile(input: UserUpdateProfileInput) {
    console.log('input, ', input)
    return updateProfileMutation({ profileId: profile.id!, input })
      .then((res) => {
        modals.closeAll()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          console.log('res.data.item, ', res.data.item)
          setItem(res.data.item)
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }
  const primaryProfile = profile?.owner?.profile?.type === profile.type
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <ProfileTypeBadge
              label={`Edit ${profile.type} Profile`}
              profileType={profile.type as ProfileType}
              verified={!!item.gumProfile}
            />
            {primaryProfile ? (
              <UserProfileBadge label="Primary" tooltip="This profile is your primary profile on PubKey" />
            ) : (
              <Tooltip label={`Use ${profile.type} as your primary profile on PubKey`}>
                <Button variant="subtle" size="xs" onClick={setDefaultProfile}>
                  Use as Primary
                </Button>
              </Tooltip>
            )}
          </Group>
        }
        centered
        size="lg"
      >
        <ProfileForm primaryProfile={primaryProfile} profile={item} updateProfile={updateProfile} />
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
  primaryProfile,
  updateProfile,
}: {
  profile: Profile
  primaryProfile: boolean
  updateProfile: (input: Partial<UserUpdateProfileInput>) => Promise<boolean | undefined>
}) {
  const fields: UiFormField<UserUpdateProfileInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('username', { label: 'Username' }),
    formFieldTextarea('bio', { label: 'Bio' }),
    formFieldCheckbox('private', {
      label: 'Set profile to private',
      description: 'A private profile will not be visible for other people.',
      disabled: primaryProfile,
    }),
  ]

  return (
    <UiForm<UserUpdateProfileInput>
      fields={fields}
      model={{
        name: profile.name ?? '',
        username: profile.username ?? '',
        bio: profile.bio ?? '',
        private: profile.private ?? false,
      }}
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
