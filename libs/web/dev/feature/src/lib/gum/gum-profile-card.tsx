import { Anchor, Box, Group, Stack, Title } from '@mantine/core'
import { LinkAccount, UiDebugModal } from '@pubkeyapp/web/ui/core'
import React from 'react'
import { GumProfile, GumUser } from './gum-interfaces'

import { GumPostCreateButton } from './gum-post-create-button'
import { GumPostDeleteButton } from './gum-post-delete-button'
import { GumProfileDeleteButton } from './gum-profile-delete-button'

export function GumProfileCard({ profile, user }: { profile: GumProfile; user: GumUser }) {
  return (
    <Box>
      <Stack>
        <Title order={5}>Profile Metadata</Title>
        <Group position="apart" align="start">
          <Stack>
            {profile.metadata?.map((meta) => (
              <Group key={meta.publicKey.toString()}>
                <LinkAccount address={profile.publicKey} />
                <Anchor href={meta.metadataUri} target="_blank">
                  Profile metadata
                </Anchor>
              </Group>
            ))}
          </Stack>
          <GumProfileDeleteButton profile={profile} user={user} />
        </Group>
        <Title order={5}>Post Metadata</Title>
        {profile.posts?.map((post) => (
          <Group key={post.publicKey.toString()} position="apart">
            <Group align="center">
              <LinkAccount address={post.publicKey} />
              <Anchor href={post.metadataUri} target="_blank">
                Post metadata
              </Anchor>
            </Group>
            <GumPostDeleteButton post={post.publicKey} profile={profile} user={user} />
          </Group>
        ))}

        <Group position="apart">
          <GumPostCreateButton profile={profile} user={user} />
          <UiDebugModal data={profile} />
        </Group>
      </Stack>
    </Box>
  )
}
