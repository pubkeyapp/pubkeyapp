import { Flex, Paper, Stack, Text } from '@mantine/core'
import { PageCreateButtons, PageList } from '@pubkeyapp/web/page/ui'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { useUserPagesQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function WebPageEditorListFeature() {
  const [{ data: pages }] = useUserPagesQuery()

  return (
    <Stack>
      <UiPageHeader
        title={
          <Text component={Link} to="/profiles" size="xl">
            Profiles
          </Text>
        }
        leftAction={<UiBackButton to="/dashboard" />}
      />
      <Paper>
        <Flex direction="column" justify="space-between" sx={{ height: '100%' }}>
          <Stack mb={32}>
            <Text size="xl" fw={500}>
              Your profiles
            </Text>
            <PageList pages={pages?.items ?? []} />
          </Stack>
          <PageCreateButtons pages={pages?.items ?? []} />
        </Flex>
      </Paper>
    </Stack>
  )
}
