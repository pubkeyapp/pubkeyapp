import { Avatar, Center, Flex, Paper, Stack, Text } from '@mantine/core'
import { User } from '@pubkeyapp/sdk'
import React from 'react'

export function PageUserProfile({ user }: { user: User }) {
  return (
    <Paper>
      <Flex direction="column" align="center">
        <Stack>
          <Avatar src={user.avatarUrl} size={120} radius={120} />
          <Stack>
            <Center>
              <Text size="xl" weight="bold">
                {user.name ?? user.username}
              </Text>
            </Center>
            {user?.bio ? <Text>{user?.bio}</Text> : null}
          </Stack>
        </Stack>
      </Flex>
    </Paper>
  )
}
