import { Button } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'

import { GumProfile, GumUser } from './gum-interfaces'
import { useGumApp } from './use-gum-app'

export function GumPostCreateButton({ profile, user }: { profile: GumProfile; user: GumUser }) {
  const { createPost, refresh } = useGumApp()

  return (
    <Button
      radius="xl"
      variant="outline"
      onClick={() => {
        const url = prompt(
          'Pass the metadata URL for the post you want to create. You can use the following for testing:',
          'https://jzhsx6pb6yqy7rsq3wm6kmgk7bpgixy5yymmzdk4b5go6wuie5vq.arweave.net/Tk8r-eH2IY_GUN2Z5TDK-F5kXx3GGMyNXA9M71qIJ2s',
        )
        if (!url) return
        createPost(profile.publicKey, user.publicKey, url)
          .then(() => refresh())
          .then(() => showNotificationSuccess('Post Created'))
          .catch(() => showNotificationError('Post Creation Failed'))
      }}
    >
      Create Post
    </Button>
  )
}
