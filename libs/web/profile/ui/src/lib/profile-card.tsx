import { ActionIcon, Avatar, Box, Center, Flex, Group, Stack, Text, Tooltip } from '@mantine/core'
import { Profile, ProfileType } from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheck, IconDiscountCheckFilled } from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { ProfileTypeBadge } from './profile-type-icon'

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
                  <Group spacing={2}>
                    <Text component={Link} to={`${profile.owner.profileUrl}`} color="dimmed" ff="monospace">
                      {profile.owner.username}#{profile.owner.pid}
                    </Text>

                    <Tooltip label={profile?.owner?.gumUser ? 'Gum User Verified' : 'Verify your Gum User'} withArrow>
                      <ActionIcon size="xs" variant="subtle">
                        <Text color={profile?.owner?.gumUser ? 'blue' : 'dimmed'} sx={{ display: 'flex' }}>
                          {profile?.owner?.gumUser ? <IconDiscountCheckFilled size={16} /> : <IconDiscountCheck />}
                        </Text>
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                ) : null}
              </Stack>
            </Center>
            <Center>
              <ProfileTypeBadge profileType={profile.type as ProfileType} verified={!!profile.gumProfile} />
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
