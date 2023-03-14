import { Alert, Container, Group, SimpleGrid, Stack } from '@mantine/core'
import { ProfileIdentityCard } from '@pubkeyapp/web/profile/ui'
import { PubKeyProfileBadge, UiError, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { Profile, ProfileType, useAnonGetUserQuery } from '@pubkeyapp/web/util/sdk'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export function ProfileDetailsFeature() {
  const { username } = useParams<{ username: string }>()
  const [{ data, fetching, error }] = useAnonGetUserQuery({ variables: { username: `${username}` } })

  const profiles = useMemo(() => {
    return data?.item?.profiles ?? []
  }, [data?.item])

  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]
  const ordered = useMemo(() => {
    return types
      .map((type) => profiles.find((profile) => profile.type === type))
      .filter((profile) => profile !== undefined) as Profile[]
  }, [profiles])

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <Container size="lg" mt={48}>
          <Stack align="center" my={32} spacing={32}>
            <Group position="center">
              <PubKeyProfileBadge
                user={data.item}
                tooltip={`PubKey Profile: ${data.item?.username}#${data.item?.pid}`}
              />
            </Group>
            {ordered?.length ? (
              ordered?.length === 1 ? (
                <ProfileIdentityCard profile={ordered[0]} miw={500} />
              ) : (
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  {ordered?.map((profile) => (
                    <ProfileIdentityCard key={profile.id} profile={profile} />
                  ))}
                </SimpleGrid>
              )
            ) : (
              <Alert icon={<IconAlertCircle size="1rem" />} variant="outline">
                This user does not have any profiles.
              </Alert>
            )}
          </Stack>
        </Container>
      ) : (
        <UiError error="User not found..." />
      )}
    </UiErrorLoader>
  )
}
