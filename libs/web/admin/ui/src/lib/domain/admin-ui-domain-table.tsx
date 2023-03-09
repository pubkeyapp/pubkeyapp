import { ActionIcon, Group, ScrollArea, Text } from '@mantine/core'
import { Domain } from '@pubkeyapp/web/util/sdk'
import { IconPencil, IconTrash } from '@tabler//icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { AdminUiUserLink } from '../admin-ui-user-link'
import { AdminUiDomainLabel } from './admin-ui-domain-label'

interface AdminUiDomainTableProps {
  domains: Domain[]
  deleteDomain: (domain: Domain) => void
}

export function AdminUiDomainTable({ deleteDomain, domains }: AdminUiDomainTableProps) {
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
            accessor: 'name',
            render: (domain) => <AdminUiDomainLabel domain={domain} />,
          },
          {
            accessor: 'order',
          },
          {
            accessor: 'owner',
            render: (domain) => {
              return domain.owner ? <AdminUiUserLink user={domain.owner} /> : 'No owner'
            },
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon component={Link} to={`/admin/domains/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteDomain(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={domains}
      />
    </ScrollArea>
  )
}
