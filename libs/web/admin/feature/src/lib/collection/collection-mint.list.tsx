import { Button, Group, Pagination, Select, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { UiDebug, UiDebugModal } from '@pubkeyapp/web/ui/core'
import {
  AdminGetCollectionMintsInput,
  Collection,
  Trait,
  TraitFilter,
  useAdminGetCollectionMintsQuery,
  useAdminGetCollectionTraitsQuery,
} from '@pubkeyapp/web/util/sdk'
import { useMemo, useState } from 'react'
import { MintGrid } from './mint.grid'

export function CollectionMintList({ collection }: { collection: Collection }) {
  const collectionId = collection.id!
  const total = collection.mintCount ?? 0

  const [{ data: collectionTraits }] = useAdminGetCollectionTraitsQuery({
    variables: {
      collectionId: collectionId!,
    },
  })

  const [take, setTake] = useState<number>(24)
  const [search, setSearch] = useState<string>('')
  const [traits, setTraits] = useState<TraitFilter[]>([])

  const pages = useMemo(() => Math.ceil(total / take), [total, take])
  const pagination = usePagination({ total: pages, initialPage: 1 })

  const input = useMemo<AdminGetCollectionMintsInput>(
    () => ({ skip: (pagination.active - 1) * take, search, take, traits }),
    [pagination.active, search, take, traits],
  )

  const [{ data, fetching }] = useAdminGetCollectionMintsQuery({
    variables: { collectionId, input },
  })

  return (
    <Stack spacing={32}>
      <Group position="center">
        <Select
          size="lg"
          radius="xl"
          sx={{ width: 100 }}
          value={take.toString()}
          onChange={(value: string) => {
            if (value === 'all') return setTake(total)
            setTake(parseInt(value))
          }}
          data={[
            { value: '6', label: '6' },
            { value: '12', label: '12' },
            { value: '24', label: '24' },
            { value: '36', label: '36' },
            { value: '48', label: '48' },
            { value: '60', label: '60' },
            { value: '72', label: '72' },
            { value: '84', label: '84' },
            { value: '96', label: '96' },
            { value: '512', label: '512' },
            { value: '1024', label: '1024' },
          ]}
        />
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
      <Group position="center">
        <Pagination
          size="lg"
          radius="xl"
          total={pages}
          onChange={(page) => pagination.setPage(page)}
          onNextPage={() => pagination.next()}
          onPreviousPage={() => pagination.previous()}
        />
      </Group>

      {collectionTraits?.items ? (
        <TraitFilters collectionTraits={collectionTraits?.items} traits={traits} setTraits={setTraits} />
      ) : null}

      <MintGrid mints={data?.items ?? []} />

      <UiDebugModal
        data={{
          active: pagination.active,
          loading: fetching,
          count: data?.items?.length,
          mintCount: total,
          total: pages,
          input,
        }}
      />
    </Stack>
  )
}

export function TraitFilters({
  collectionTraits,
  setTraits,
  traits,
}: {
  collectionTraits: Trait[]
  traits: TraitFilter[]
  setTraits: (traits: TraitFilter[]) => void
}) {
  const traitMap = useMemo(() => {
    return collectionTraits.reduce((acc, trait) => {
      return { ...acc, [trait.key]: [...(acc[trait.key] ?? []), trait] }
    }, {} as Record<string, Trait[]>)
  }, [traits])

  return (
    <Stack>
      <SimpleGrid cols={4} spacing={16}>
        {Object.keys(traitMap).map((key) => {
          const trait = traitMap[key]
          console.log(trait)

          const selected = traits.find((t) => t.key === key)
          if (selected) {
            console.log(selected)
          }

          return (
            <Select
              size="lg"
              radius="xl"
              placeholder={`Select ${key}`}
              value={selected ? selected.value : ''}
              onChange={(value: string) => {
                setTraits([...traits.filter((t) => t.key !== key), { key, value }])
              }}
              data={[
                { value: '', label: `Select ${key}` },
                ...(trait.map((trait) => ({
                  value: trait.value,
                  label: trait.value,
                })) ?? []),
              ]}
            />
          )
        })}
      </SimpleGrid>
      <UiDebug data={{ traits }} open />
    </Stack>
  )
}
