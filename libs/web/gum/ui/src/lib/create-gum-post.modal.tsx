import { useCreatePost } from '@gumhq/react-sdk'
import { Group, Modal, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationError, UiActionIcon, UiDebug } from '@pubkeyapp/web/ui/core'
import { PublicKey } from '@solana/web3.js'
import { IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'
import { GumPostForm, GumPostInput } from './gum-post.form'

export function CreateGumPostModal({ post }: { post: GumPostInput }) {
  const { sdk } = useGumApp()
  const [opened, { open, close }] = useDisclosure(false)
  const [progress, setProgress] = useState<any>('none')
  const { create, isCreatingPost, createPostError, postPDA } = useCreatePost(sdk)
  const submit = async (input: Partial<GumPostInput>) => {
    setProgress('submitting')

    if (!input.metadataUri || !input.profileAccount || !input.userAccount || !input.owner) {
      console.log('Invalid input', { input })
      setProgress('none')
      return false
    }
    return create(
      input.metadataUri,
      new PublicKey(input.profileAccount),
      new PublicKey(input.userAccount),
      new PublicKey(input.owner),
    )
      .then((res) => {
        // Now, what?
        // FIXME: We need to get a hold of the transaction ID and track the progress with a loading indicator
        setProgress('submitted')
        return true
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Gum Post" centered size="lg">
        <Stack spacing={32} pt={32}>
          <GumPostForm model={post} submit={submit} />
          <UiDebug data={{ post, progress, isCreatingPost, createPostError }} open />
        </Stack>
      </Modal>
      <Group position="center">
        <UiActionIcon size="xl" iconSize={24} label="Create Post" icon={IconPlus} onClick={open} />
      </Group>
    </>
  )
}
