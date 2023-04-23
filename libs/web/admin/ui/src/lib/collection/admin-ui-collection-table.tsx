import { ActionIcon, Group, ScrollArea, Text } from '@mantine/core'
import { UiActionIcon } from '@pubkeyapp/web/ui/core'
import { Collection } from '@pubkeyapp/web/util/sdk'
import { IconNavigation, IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { AdminUiCollectionLabel } from './admin-ui-collection-label'

interface AdminUiCollectionTableProps {
  collections: Collection[]
  deleteCollection: (collectionId: string) => void
}

export function AdminUiCollectionTable({ collections, deleteCollection }: AdminUiCollectionTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="xl"
        styles={{ root: { paddingTop: 10 } }}
        sx={{ borderWidth: 4 }}
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'publicKey',
            render: (collection) => <AdminUiCollectionLabel collection={collection} />,
          },
          { accessor: 'network' },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <UiActionIcon label="Delete Collection" icon={IconTrash} onClick={() => deleteCollection(item.id!)} />
                <ActionIcon component={Link} to={item?.explorerUrl + ''}>
                  <IconNavigation size={16} />
                </ActionIcon>
                <ActionIcon component={Link} to={`/admin/collections/${item?.id}`}>
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={collections}
      />
    </ScrollArea>
  )
}
