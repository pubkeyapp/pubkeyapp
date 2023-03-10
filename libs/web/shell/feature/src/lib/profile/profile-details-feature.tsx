import { Container, Group, Stack } from '@mantine/core'
import { PageUserProfile } from '@pubkeyapp/web/page/ui'
import { ProfileTypeIcon } from '@pubkeyapp/web/profile/ui'
import { UiError, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { ProfileType, useAnonGetUserQuery } from '@pubkeyapp/web/util/sdk'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ProfilePage } from './profile.page'

export function ProfileDetailsFeature() {
  const { username } = useParams<{ username: string }>()
  const [{ data, fetching, error }] = useAnonGetUserQuery({ variables: { username: `${username}` } })
  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]

  const profiles = useMemo(() => {
    return data?.item?.profiles ?? []
  }, [data?.item])

  const profileTypes = useMemo(() => {
    return types.filter((type) => profiles.find((profile) => profile.type === type))
  }, [profiles])

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <Container size="md" mt={48}>
          <Stack>
            {data?.item ? <PageUserProfile user={data.item as any} /> : null}
            {profileTypes?.length ? (
              <UiTabRoutes
                grow={false}
                tabs={[
                  ...profileTypes.map((type) => {
                    const profile = profiles.find((profile) => profile.type === type)
                    return {
                      label: (
                        <Group>
                          <ProfileTypeIcon type={type} size={36} />
                          {type}
                        </Group>
                      ),
                      value: type.toLowerCase(),
                      component: <ProfilePage profileId={`${profile?.id}`} />,
                    }
                  }),
                ]}
              />
            ) : null}
          </Stack>
        </Container>
      ) : (
        <UiError error="User not found..." />
      )}
    </UiErrorLoader>
  )
}
