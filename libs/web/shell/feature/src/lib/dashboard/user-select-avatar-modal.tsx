import {
  Alert,
  Avatar,
  AvatarProps,
  Box,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IdentityBadge } from '@pubkeyapp/web/identity/ui'
import { ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { getAvatarUrl } from '@pubkeyapp/web/ui/core'
import { Identity, Profile, ProfileType, User } from '@pubkeyapp/web/util/sdk'
import React from 'react'

export interface UserSelectAvatarModalProps extends AvatarProps {
  avatarUrl?: string
  identities?: Identity[]
  profile: Profile
  updateAvatar: (avatarUrl: string) => Promise<boolean>
}

export function UserSelectAvatarModal({
  avatarUrl,
  identities,
  profile,
  updateAvatar,
  ...props
}: UserSelectAvatarModalProps) {
  identities = identities ?? []
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title={
          <Group>
            <ProfileTypeBadge
              label={`Select ${profile.type} Avatar`}
              profileType={profile.type as ProfileType}
              verified={!!profile.gumProfile}
            />
          </Group>
        }
        centered
      >
        {identities.length ? (
          <Box py={16}>
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              {identities.map((identity) => (
                <UserProviderCard key={identity.id} identity={identity} updateAvatar={updateAvatar} />
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Alert>You need to link some identities!</Alert>
        )}
      </Modal>
      <Group position="center">
        <Tooltip label={`Select ${profile.type} avatar`}>
          <UnstyledButton onClick={open}>
            <Avatar src={avatarUrl ?? profile?.avatarUrl} size={120} radius={120} {...props} />
          </UnstyledButton>
        </Tooltip>
      </Group>
    </>
  )
}

export function UserProviderCard({
  identity,
  updateAvatar,
}: {
  identity: Identity
  updateAvatar: (avatarUrl: string) => Promise<boolean>
}) {
  const avatar = identity.profile?.avatarUrl ?? getAvatarUrl(identity.providerId)

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Group position="center">
        <Stack>
          <Tooltip label={`Use ${identity.provider} avatar`}>
            <UnstyledButton
              onClick={() => {
                updateAvatar(avatar).then(() => {
                  modals.closeAll()
                })
              }}
            >
              <Avatar src={avatar} size={120} radius={120} mx="auto" />
            </UnstyledButton>
          </Tooltip>
          <IdentityBadge identity={identity} />
        </Stack>
      </Group>
    </Paper>
  )
}
