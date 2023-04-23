import { Button, Group, Pagination, Stack, TextInput } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import {
  AdminGetCollectionMintsInput,
  Collection,
  useAdminGetCollectionMintsQuery,
  useAdminSyncCollectionMetaMutation,
  useAdminSyncCollectionMutation,
} from '@pubkeyapp/web/util/sdk'
import { useMemo, useState } from 'react'
import { MintGrid } from './mint.grid'

export function CollectionMintList({ collection }: { collection: Collection }) {
  const collectionId = collection.id!
  const take = 90

  const [search, setSearch] = useState<string>('')
  const total = collection.mintCount ?? 0
  const pages = useMemo(() => Math.ceil(total / take), [total, take])
  const pagination = usePagination({ total: pages, initialPage: 1 })

  const input = useMemo<AdminGetCollectionMintsInput>(
    () => ({ skip: (pagination.active - 1) * take, search, take }),
    [pagination.active, search, take],
  )

  const [{ data, error, fetching }, refresh] = useAdminGetCollectionMintsQuery({
    variables: { collectionId, input },
  })

  const [, syncCollectionMutation] = useAdminSyncCollectionMutation()
  const [, syncCollectionMetaMutation] = useAdminSyncCollectionMetaMutation()

  function syncCollection() {
    syncCollectionMutation({ collectionId })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
      .finally(refresh)
  }

  function syncCollectionMeta() {
    syncCollectionMetaMutation({ collectionId })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
      .finally(refresh)
  }

  return (
    <Stack>
      <Group>
        <Button onClick={() => syncCollection()}>Sync</Button>
        <Button onClick={() => syncCollectionMeta()}>Sync Meta</Button>
        <TextInput
          name={'search'}
          placeholder={'Search'}
          value={search}
          size="lg"
          radius="xl"
          onChange={(e) => setSearch(e.currentTarget.value)}
          rightSection={<Button onClick={() => setSearch('')}>Clear</Button>}
        />
      </Group>

      <UiDebug
        data={{
          active: pagination.active,
          loading: fetching,
          count: data?.items?.length,
          mintCount: total,
          total: pages,
          input,
        }}
        open
      />
      <Pagination
        total={pages}
        onChange={(page) => pagination.setPage(page)}
        onNextPage={() => pagination.next()}
        onPreviousPage={() => pagination.previous()}
      />
      <MintGrid mints={data?.items ?? []} />
    </Stack>
  )
}
