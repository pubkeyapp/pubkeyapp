import { ActionIcon, Group, ScrollArea, Text } from '@mantine/core'
import { UiActionIcon } from '@pubkeyapp/web/ui/core'
import { Cluster } from '@pubkeyapp/web/util/sdk'
import { IconNavigation, IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { AdminUiClusterLabel } from './admin-ui-cluster-label'

interface AdminUiClusterTableProps {
  clusters: Cluster[]
  deleteCluster: (clusterId: string) => void
}

export function AdminUiClusterTable({ clusters, deleteCluster }: AdminUiClusterTableProps) {
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
            render: (cluster) => <AdminUiClusterLabel cluster={cluster} />,
          },
          { accessor: 'network' },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <UiActionIcon label="Delete Cluster" icon={IconTrash} onClick={() => deleteCluster(item.id!)} />
                <ActionIcon component={Link} to={`/admin/clusters/${item?.id}`}>
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={clusters}
      />
    </ScrollArea>
  )
}
