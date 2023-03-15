import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  CardProps,
  Center,
  createStyles,
  Flex,
  Group,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import { IdentityProviderAvatar } from '@pubkeyapp/web/identity/ui'
import { PubKeyProfileBadge } from '@pubkeyapp/web/ui/core'
import { IdentityProvider, Profile, ProfileType } from '@pubkeyapp/web/util/sdk'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { ProfileTypeBadge } from './profile-type-icon'

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    boxShadow: theme.shadows.sm,
  },
}))

export interface ProfileIdentityCardProps extends Omit<CardProps, 'children'> {
  actions?: ReactNode
  avatar?: ReactNode
  profile: Profile
}
export function ProfileIdentityCard({ actions, avatar, profile, ...props }: ProfileIdentityCardProps) {
  const { classes } = useStyles()
  return (
    <Card className={classes.wrapper} {...props}>
      <Group position="apart">
        {profile.owner ? (
          <PubKeyProfileBadge
            user={profile.owner}
            tooltip={`PubKey Profile: ${profile.owner?.username}#${profile.owner?.pid}`}
          />
        ) : (
          <div />
        )}
        <ProfileTypeBadge profileType={profile.type as ProfileType} verified={!!profile.gumProfile} />
      </Group>
      <ProfileIdentityCardContent profile={profile} actions={actions} avatar={avatar} />
    </Card>
  )
}

export function ProfileIdentityCardContent({
  profile,
  actions,
  avatar,
}: {
  profile: Profile
  actions?: ReactNode
  avatar?: ReactNode
}) {
  const { theme } = useStyles()
  return (
    <Box>
      <Flex direction="row" align="start" mt="lg">
        <Stack sx={{}} p="sm">
          {avatar ? avatar : <Avatar src={profile.avatarUrl} size={128} radius={128} />}
        </Stack>
        <Stack sx={{ flexGrow: 1 }} p="sm">
          <Group position="apart" align="start">
            <Stack spacing={4}>
              <Text size="xl" weight="bold">
                {profile.name}
              </Text>
              {profile?.owner ? (
                <Group spacing={2}>
                  <Text component={Link} to={`${profile.profileUrl}`} color="dimmed" ff="monospace">
                    {profile.username}
                  </Text>
                </Group>
              ) : null}
            </Stack>
            <Stack spacing={4}>{actions}</Stack>
          </Group>
          <Box>
            <Group spacing={8}>
              {profile.identities?.map((identity) => (
                <Tooltip key={identity.id} label={identity.provider}>
                  <ActionIcon
                    color={theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}
                    size="lg"
                    radius="xl"
                    component={'a'}
                    href={identity.link as string}
                    target="_blank"
                  >
                    <Avatar radius="xl" color="brand">
                      <IdentityProviderAvatar size={24} provider={identity.provider as IdentityProvider} />
                    </Avatar>
                  </ActionIcon>
                </Tooltip>
              ))}
            </Group>
          </Box>
        </Stack>
      </Flex>
      <Flex direction="column" align="center">
        <Stack align="center">
          <Stack>
            <Center>
              <Stack spacing="xs"></Stack>
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
