import { Box, Container, Group, Stack } from '@mantine/core'
import { Page } from '@pubkeyapp/sdk'
import { PageUserProfile, PageWrapper } from '@pubkeyapp/web/page/ui'
import { ProfileTypeIcon } from '@pubkeyapp/web/profile/ui'
import { UiError, UiErrorLoader, UiLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import {
  ProfileType,
  usePublicUserPagesQuery,
  usePublicUserQuery,
  useUserProfilePageQuery,
} from '@pubkeyapp/web/util/sdk'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export function ProfileDetailsFeature() {
  const { username } = useParams<{ username: string }>()
  const [{ data, fetching, error }] = usePublicUserQuery({ variables: { username: `${username}` } })
  const [{ data: pagesData, fetching: pagesFetching, error: pagesError }] = usePublicUserPagesQuery({
    variables: { username: '' + username },
  })
  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]

  const profiles = useMemo(() => {
    return data?.item?.profiles ?? []
  }, [data?.item])

  const profileTypes = useMemo(() => {
    return types.filter((type) => profiles.find((profile) => profile.type === type))
  }, [profiles])

  return (
    <UiErrorLoader error={error ?? pagesError} loading={fetching ?? pagesFetching}>
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

export function ProfilePage({ profileId }: { profileId: string }) {
  const [{ data, fetching }] = useUserProfilePageQuery({ variables: { profileId } })
  return (
    <Box>
      {fetching ? (
        <UiLoader />
      ) : data?.item ? (
        <Group position="center">
          <PageWrapper hideShareButton page={data.item as Page} />
        </Group>
      ) : (
        <UiError error="Page not found..." />
      )}
      <Stack>
        {/*{profile.page ? <PageWrapper page={profile.page as Page} /> : <UiError error="Page not found..." />}*/}
      </Stack>
    </Box>
  )
}
