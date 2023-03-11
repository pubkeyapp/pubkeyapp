import { Avatar, Box, Center, Flex, Stack, Text } from '@mantine/core'
import { Profile } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Box>
      <Flex direction="column" align="center">
        <Stack align="center">
          <Avatar src={profile.avatarUrl} size={120} radius={120} />
          <Stack>
            <Center>
              <Stack spacing="xs">
                <Text size="xl" weight="bold">
                  {profile.name}
                </Text>
                {profile?.owner ? (
                  <Text component={Link} to={`${profile.owner.profileUrl}`} color="dimmed" ff="monospace">
                    {profile.owner.username}#{profile.owner.pid}
                  </Text>
                ) : null}
              </Stack>
            </Center>
            {profile?.bio ? (
              <Text align="center">
                <ReactMarkdown>{profile.bio}</ReactMarkdown>
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  )
}
