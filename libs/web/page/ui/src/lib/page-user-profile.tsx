import { Avatar, Box, Center, Flex, Group, Paper, Stack, Text } from '@mantine/core'
import { User } from '@pubkeyapp/sdk'
import React from 'react'
import ReactMarkdown from 'react-markdown'

export function PageUserProfile({ user }: { user: User }) {
  return (
    <Box>
      <Flex direction="column" align="center">
        <Stack align="center">
          <Avatar src={user.avatarUrl} size={120} radius={120} />
          <Stack>
            <Center>
              <Text size="xl" weight="bold">
                {user.name ?? user.username}
              </Text>
            </Center>
            {user?.bio ? (
              <Text align="center">
                <ReactMarkdown>{user.bio}</ReactMarkdown>
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Flex>
    </Box>
  )
}
