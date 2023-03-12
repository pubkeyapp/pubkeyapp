import { Button } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { ProfileType, useUserCreateProfileMutation } from '@pubkeyapp/web/util/sdk'
import React, { useState } from 'react'
import { getProfileTypeColor, ProfileTypeIcon } from './profile-type-icon'

export function ProfileCreateButton({ type }: { type: ProfileType }) {
  const { user } = useAuth()
  const { refresh } = useUserProfiles()
  const [_, createProfileMutation] = useUserCreateProfileMutation()
  const [loading, setLoading] = useState(false)
  const { createProfile } = useGumApp()

  const createProfile2 = async (type: ProfileType) => {
    if (!user?.gumUser) {
      return showNotificationError('You need to create a GUM account first')
    }
    console.log('Create', type)
    setLoading(true)

    createProfile(type, user?.publicKey!, user?.gumUser?.address!)
      .then(() => createProfileMutation({ type }))
      .then((res) => {
        refresh()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess(`Profile ${type} created`)
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.messrofile))
      .finally(() => setLoading(false))
    return
  }

  return (
    <Button
      loading={loading}
      key={type}
      size="lg"
      variant="subtle"
      color={getProfileTypeColor(type)}
      leftIcon={<ProfileTypeIcon type={type} size={36} />}
      onClick={() => createProfile2(type)}
    >
      Create {type} Profile
    </Button>
  )
}
