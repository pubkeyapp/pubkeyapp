import { Button } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import React from 'react'
import { useGumApp } from './use-gum-app'

export function GumUserDeleteButton({ userAccount }: { userAccount: PublicKey }) {
  const loading = false
  const { deleteUser } = useGumApp()
  return (
    <Button size="xs" radius="xl" variant={loading ? 'filled' : 'outline'} onClick={() => deleteUser(userAccount)}>
      Delete User
    </Button>
  )
}
