import { Button } from '@mantine/core'
import React from 'react'
import { GumProfile, GumUser } from './gum-interfaces'
import { useGumApp } from './use-gum-app'

export function GumProfileDeleteButton({ profile, user }: { profile: GumProfile; user: GumUser }) {
  const loading = false
  const { deleteProfile } = useGumApp()

  return (
    <Button
      size="xs"
      radius="xl"
      variant="outline"
      loading={loading}
      onClick={() => {
        if (!window.confirm('Are you sure you want to delete this profile?')) return
        deleteProfile(profile.publicKey, user.publicKey)
      }}
    >
      Delete Profile
    </Button>
  )
}
