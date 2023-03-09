import { Button } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import React from 'react'
import { GumProfile, GumUser } from './gum-interfaces'
import { useGumApp } from './use-gum-app'

export function GumPostDeleteButton({ post, profile, user }: { post: PublicKey; profile: GumProfile; user: GumUser }) {
  const loading = false
  const { deletePost } = useGumApp()

  return (
    <Button
      size="xs"
      radius="xl"
      variant="outline"
      loading={loading}
      onClick={() => {
        if (!window.confirm('Are you sure you want to delete this post?')) return
        deletePost(post, profile.publicKey, user.publicKey)
      }}
    >
      Delete Post
    </Button>
  )
}
