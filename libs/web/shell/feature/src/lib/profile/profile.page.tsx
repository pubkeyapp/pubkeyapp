import { Box, Group, Stack } from '@mantine/core'
import { Page } from '@pubkeyapp/sdk'
import { PageWrapper } from '@pubkeyapp/web/page/ui'
import { UiError, UiLoader } from '@pubkeyapp/web/ui/core'
import { useUserGetProfilePageQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'

export function ProfilePage({ profileId }: { profileId: string }) {
  const [{ data, fetching }] = useUserGetProfilePageQuery({ variables: { profileId } })
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
