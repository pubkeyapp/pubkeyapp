import { Button } from '@mantine/core'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { ProfileType, useUserCreateProfileMutation } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { getProfileTypeColor, ProfileTypeIcon } from './profile-type-icon'

export function ProfileCreateButton({ type }: { type: ProfileType }) {
  const { refresh } = useUserProfiles()
  const [_, createProfileMutation] = useUserCreateProfileMutation()

  const createProfile = async (type: ProfileType) => {
    createProfileMutation({ type })
      .then((res) => {
        refresh()
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
      color={getProfileTypeColor(type)}
      leftIcon={<ProfileTypeIcon type={type} size={36} />}
      onClick={() => createProfile(type)}
    >
      Create {type} Profile
    </Button>
  )
}
