import { Button, Group, Modal, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { PubKeyProfileBadge, showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { Profile, ProfileType, UserUpdateProfileInput, useUserUpdateProfileMutation } from '@pubkeyapp/web/util/sdk'
import React, { useState } from 'react'

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
            <ProfileTypeBadge
              label={`Edit ${profile.type} Profile`}
              profileType={profile.type as ProfileType}
              verified={!!item.gumProfile}
            />
            {profile?.owner?.profile?.type === profile.type ? (
              <PubKeyProfileBadge label="Primary" tooltip="This profile is your primary profile on PubKey" />
            ) : null}
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
      model={{
        name: profile.name ?? '',
        username: profile.username ?? '',
        bio: profile.bio ?? '',
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
