import { ActionIcon, Anchor, Code, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { Plan } from '@pubkeyapp/web/util/sdk'
import { IconPencil, IconTrash } from '@tabler//icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminPlanTableProps {
  plans: Plan[]
  deletePlan: (plan: Plan) => void
}

export function PlanTable({ deletePlan, plans }: AdminPlanTableProps) {
  const theme = useMantineTheme()
  return (
    <ScrollArea>
      <DataTable
        borderRadius="md"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'id',
            textAlignment: 'center',
            render: (item) => {
              const link = `/admin/plans/${item.id}`
              return (
                <Group spacing={0} position="center">
                  <Anchor component={Link} to={link}>
                    <Code color="brand">{item.id}</Code>
                  </Anchor>
                </Group>
              )
            },
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} noWrap position="right">
                <ActionIcon component={Link} to={`/admin/plans/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deletePlan(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={plans}
      />
    </ScrollArea>
  )
}
