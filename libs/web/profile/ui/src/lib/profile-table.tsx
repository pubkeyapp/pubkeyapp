import { ActionIcon, Anchor, Avatar, Code, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { Profile, ProfileType } from '@pubkeyapp/web/util/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { ProfileTypeBadge, ProfileTypeIcon } from './profile-type-icon'

interface AdminProfileTableProps {
  profiles: Profile[]
  deleteProfile: (profile: Profile) => void
}

export function ProfileTable({ deleteProfile, profiles }: AdminProfileTableProps) {
  const theme = useMantineTheme()
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
            title: 'Owner',
            accessor: 'owner.name',
            render: (item) => (
              <Anchor component={Link} to={`/admin/users/${item?.owner?.id}`} color={theme.colors.brand[4]}>
                <Group spacing="xs">
                  <Avatar size="sm" src={item?.owner?.profile?.avatarUrl ?? ''} radius={50} />
                  <Text>{item.owner?.username}</Text>
                </Group>
              </Anchor>
            ),
          },
          {
            accessor: 'type',
            render: (item) => (
              <Anchor component={Link} to={`/admin/profiles/${item.id}`}>
                <ProfileTypeBadge profileType={item.type as ProfileType} verified={!!item.gumProfile} />
              </Anchor>
            ),
          },
          {
            title: 'Page',
            accessor: 'page.id',
            render: (item) =>
              item?.page ? (
                <Anchor component={Link} to={`/admin/pages/${item?.page?.id}`} color={theme.colors.brand[4]}>
                  <Group spacing="xs">
                    <Text>Edit Page</Text>
                  </Group>
                </Anchor>
              ) : (
                <Text>None</Text>
              ),
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} noWrap position="right">
                <ActionIcon component={Link} to={`/admin/profiles/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteProfile(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={profiles}
      />
    </ScrollArea>
  )
}
