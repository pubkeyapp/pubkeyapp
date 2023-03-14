import { Avatar, Box, Center, Flex, Group, Stack, Text, Tooltip } from '@mantine/core'
import { Profile } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { PageUserVerifiedModal } from './page-user-verified.modal'

export function PageUserProfile({ profile }: { profile: Profile }) {
  return (
    <Box>
      <Flex direction="column" align="center">
        <Stack align="center">
          <Avatar src={profile?.avatarUrl} size={120} radius={120} />
          <Stack>
            <Center>
              <Stack spacing="xs" align="center">
                <Text size="xl" weight="bold">
                  {profile?.name}
                </Text>
                <Group spacing={2}>
                  <Text component={Link} to={`${profile?.owner?.profileUrl}`} color="dimmed" ff="monospace">
                    {profile?.username}
                  </Text>
                  {profile?.owner?.gumUser ? (
                    <Tooltip label={'Gum User Verified'}>
                      <PageUserVerifiedModal user={profile.owner} />
                    </Tooltip>
                  ) : null}
                </Group>
              </Stack>
            </Center>
            {profile?.bio ? (
              <Text align="center">
                <ReactMarkdown>{profile?.bio}</ReactMarkdown>
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  )
}
