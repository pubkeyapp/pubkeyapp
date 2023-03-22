import { Anchor, Badge, Container, Group, Paper, Skeleton, Stack, Text } from '@mantine/core'
import { AccountTypeCardMetaplexNft } from '@pubkeyapp/web/account/ui'
import { UiDebug, UiError, UiUserLink } from '@pubkeyapp/web/ui/core'
import {
  NetworkType,
  useUserGetAccountHistoryQuery,
  useUserGetAccountQuery,
  useUserGetHeliusTransactionsQuery,
} from '@pubkeyapp/web/util/sdk'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'timeago-react'

export function AccountDetailsTab({ address, network }: { address: string; network: NetworkType }) {
  const [{ data, fetching, error }] = useUserGetAccountQuery({ variables: { network, address } })
  const [{ data: historyData, fetching: historyFetching, error: historyError }] = useUserGetAccountHistoryQuery({
    variables: { network, address },
  })
  const [{ data: transactionsData, fetching: transactionsFetching, error: transactionsError }] =
    useUserGetHeliusTransactionsQuery({
      variables: { address, network },
    })

  const suffix = useMemo(() => {
    if (network !== NetworkType.SolanaMainnet) {
      return `?cluster=${network.replace('Solana', '').toLowerCase()}`
    }
    return ''
  }, [network])

  return (
    <Container size="md">
      <Stack>
        {/*<UiDebug data={{ transactionsData, transactionsFetching, transactionsError }} />*/}
        <Skeleton visible={fetching} radius="xl">
          {error ? (
            <UiError error={error} />
          ) : (
            <Stack py={64} spacing={64}>
              {data?.item ? <AccountTypeCardMetaplexNft account={data?.item} /> : null}
              <Paper>
                <Stack>
                  <Group spacing="xs">
                    <Text>Name</Text>
                    <Anchor component={Link} to={`${data?.item?.explorerUrl}`}>
                      {data?.item?.name}
                    </Anchor>
                  </Group>
                  <Group spacing="xs">
                    <Text>Account</Text>
                    <Anchor component={Link} to={`${data?.item?.explorerUrl}`}>
                      {data?.item?.address}
                    </Anchor>
                  </Group>

                  {data?.item?.discoveredBy ? (
                    <Group spacing="xs" align="center">
                      Discovered by
                      <UiUserLink user={data?.item?.discoveredBy} />{' '}
                      <TimeAgo datetime={`${data?.item?.discoveredAt}`} />
                    </Group>
                  ) : null}

                  {data?.item?.identity?.owner ? (
                    <Group spacing="xs">
                      Linked identity
                      <UiUserLink user={data?.item?.identity?.owner} />
                    </Group>
                  ) : null}

                  <Group spacing="xs">
                    <Text>Owner</Text>
                    {data?.item?.owner?.explorerUrl ? (
                      <Anchor component={Link} to={`${data?.item?.owner?.explorerUrl}`}>
                        {data?.item?.owner?.address}
                      </Anchor>
                    ) : (
                      <Text>None</Text>
                    )}
                  </Group>

                  <Text>
                    Network <Badge>{data?.item?.network}</Badge>
                  </Text>
                  <Text>
                    Type <Badge>{data?.item?.type}</Badge>
                  </Text>
                  <Anchor component={'a'} href={`https://solscan.io/account/${address}${suffix}`} target="_blank">
                    Solscan
                  </Anchor>
                  <Anchor
                    component={'a'}
                    href={`https://explorer.solana.com/account/${address}${suffix}`}
                    target="_blank"
                  >
                    Solana Explorer
                  </Anchor>
                  <Anchor component={'a'} href={`https://solscan.fm/account/${address}${suffix}`} target="_blank">
                    Solana FM
                  </Anchor>
                </Stack>
              </Paper>
            </Stack>
          )}
        </Skeleton>

        <UiDebug data={{ data, error, historyData, historyError }} />
      </Stack>
    </Container>
  )
}
