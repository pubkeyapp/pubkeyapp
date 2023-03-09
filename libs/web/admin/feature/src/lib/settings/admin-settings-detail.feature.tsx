import { Anchor, Badge, Box, Group, Stack, Text } from '@mantine/core'
import { AdminUiUserLink } from '@pubkeyapp/web/admin/ui'
import { UiBackButton, UiDebug, UiErrorLoader, UiTabRoutes, UiTimestamp } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { useAdminAccountQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

export function AdminSettingsDetailFeature() {
  const { accountId } = useParams<{ accountId: string }>()
  const [{ data, error, fetching }] = useAdminAccountQuery({ variables: { accountId: accountId as string } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      <UiPage title={`Account ${accountId}`} leftAction={<UiBackButton />}>
        <UiTabRoutes
          tabs={[
            {
              label: 'Overview',
              value: 'overview',
              component: (
                <Stack>
                  <Box p="md">
                    <Stack>
                      <Group spacing="xs">
                        <Text>Account</Text>
                        <Anchor component={Link} to={`${data?.item?.explorerUrl}`}>
                          {data?.item?.address}
                        </Anchor>
                      </Group>
                      {data?.item?.identity?.owner ? (
                        <Group spacing="xs">
                          Linked identity
                          <AdminUiUserLink user={data?.item?.identity?.owner} />
                        </Group>
                      ) : null}

                      <Text>
                        Network <Badge>{data?.item?.network}</Badge>
                      </Text>
                      <Text>
                        Type <Badge>{data?.item?.type}</Badge>
                      </Text>
                    </Stack>
                  </Box>
                  <UiDebug data={{ data }} />
                </Stack>
              ),
            },
          ]}
        />
      </UiPage>
    </UiErrorLoader>
  )
}
