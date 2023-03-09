import { Button, Group } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { Profile, ProfileType, useUserCreateProfileMutation } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { ProfileTypeIcon } from './profile-type-icon'

export function ProfileCreateButtons({ profiles }: { profiles: Profile[] }) {
  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]
  const missingTypes = types.filter((type) => !profiles.find((profile) => profile.type === type))
  const [_, createProfileMutation] = useUserCreateProfileMutation()

  const createProfile = async (type: ProfileType) => {
    createProfileMutation({ type })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Profile created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.messrofile))
  }

  return <Group></Group>
}

export function ProfileCreateButton({ type }: { type: ProfileType }) {
  const [_, createProfileMutation] = useUserCreateProfileMutation()

  const createProfile = async (type: ProfileType) => {
    createProfileMutation({ type })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Profile created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.messrofile))
  }

  return (
    <Button
      key={type}
      size="lg"
      variant="subtle"
      leftIcon={<ProfileTypeIcon type={type} size={36} />}
      onClick={() => createProfile(type)}
    >
      Create {type} Profile
    </Button>
  )
}
