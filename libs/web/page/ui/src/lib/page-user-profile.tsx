import { Avatar, Box, Center, Flex, Stack, Text } from '@mantine/core'
import { User } from '@pubkeyapp/sdk'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

export function PageUserProfile({ user }: { user: User }) {
  return (
    <Box>
      <Flex direction="column" align="center">
        <Stack align="center">
          <Avatar src={user?.profile?.avatarUrl} size={120} radius={120} />
          <Stack>
            <Center>
              <Stack spacing="xs">
                <Text size="xl" weight="bold">
                  {user?.profile?.name}
                </Text>
                <Text component={Link} to={`${user?.profileUrl}`} color="dimmed" ff="monospace">
                  {user.username}#{user?.pid}
                </Text>
              </Stack>
            </Center>
            {user?.profile?.bio ? (
              <Text align="center">
                <ReactMarkdown>{user?.profile?.bio}</ReactMarkdown>
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  )
}
