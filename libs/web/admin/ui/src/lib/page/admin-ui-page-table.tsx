import { ActionIcon, Box, Group, ScrollArea, Text } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import { IconExternalLink, IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import React from 'react'
import { Link } from 'react-router-dom'
import { AdminUiExternalLink } from '../admin-ui-external-link'
import { AdminUiProfileLink, AdminUiUserLink } from '../admin-ui-user-link'
import { AdminUiPageLabel } from './admin-ui-page-label'

interface AdminUiPageTableProps {
  pages: Page[]
  deletePage: (page: Page) => void
}

export function AdminUiPageTable({ deletePage, pages }: AdminUiPageTableProps) {
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
            accessor: 'title',
            render: (page) => <AdminUiPageLabel page={page} />,
          },
          {
            accessor: 'profile',
            render: (page) => {
              return page.profile ? <AdminUiProfileLink profile={page.profile} /> : 'No profile'
            },
          },
          {
            accessor: 'owner',
            render: (page) => {
              return page.owner ? <AdminUiUserLink user={page.owner} /> : 'No owner'
            },
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon component={'a'} href={item.viewUrl!} target={'_blank'}>
                  <IconExternalLink size={16} />
                </ActionIcon>
                <ActionIcon component={Link} to={`/admin/pages/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deletePage(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={pages}
      />
    </ScrollArea>
  )
}
