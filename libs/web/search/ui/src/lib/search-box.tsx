import { Autocomplete, Avatar, Box, Group, MantineColor, SelectItemProps, Text } from '@mantine/core'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { getAvatarUrl } from '@pubkeyapp/web/ui/core'
import { showNotificationError } from '@pubkeyapp/web/ui/notifications'
import { Account, User, useUserSearchMutation } from '@pubkeyapp/web/util/sdk'
import { IconSearch } from '@tabler/icons-react'
import { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SearchBox() {
  const [items, setItems] = useState<any[]>()
  const navigate = useNavigate()
  const [_, searchMutation] = useUserSearchMutation()

  const handleSearch = (query: string) => {
    // If the query is empty, clear the search results
    if (query === '') {
      setItems([])
    }
    // If the query is not empty, and longer than 2 characters, search
    if (query.length > 2) {
      searchMutation({ input: { query } })
        .then((res) => {
          if (res.error) {
            return showNotificationError(res.error.message)
          }
          if (!res.error && res.data?.result) {
            if (res?.data?.result?.accounts?.length || res?.data?.result?.users?.length) {
              setItems([
                ...(res?.data?.result?.accounts?.map((item) => ({
                  value: item.name,
                  group: 'Account',
                  item,
                })) ?? []),
                ...(res?.data?.result?.users?.map((item) => ({ value: item.username, group: 'User', item })) ?? []),
              ])
            }
          }
        })
        .catch((err) => showNotificationError(err.message))
    }
  }

  return (
    <Box>
      <Autocomplete
        onChange={handleSearch}
        onItemSubmit={({ item }) => {
          if (item.__typename === 'Account') {
            navigate(`${item.explorerUrl}`)
          }
          if (item.__typename === 'User') {
            navigate(item.profileUrl)
          }
        }}
        icon={<PubKeyLogoRounded size={32} style={{ borderRadius: 8 }} />}
        rightSection={<IconSearch color="gray" />}
        variant="filled"
        color="brand"
        placeholder="Search PubKey"
        radius="xl"
        size="xl"
        data={items ?? []}
        miw={450}
        itemComponent={SearchItem}
      />
    </Box>
  )
}

interface SearchItemProps extends SelectItemProps {
  header?: string
  item?: User | Account
  color: MantineColor
  group?: string
  image?: string
}

const SearchItem = forwardRef<HTMLDivElement, SearchItemProps>(
  ({ header, value, group, item, ...others }: SearchItemProps, ref) => {
    const avatarUrl =
      (item as User)?.profile?.avatarUrl ??
      (item as Account).metadata?.fetched?.image ??
      getAvatarUrl(`${(item as Account).address}`)
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={avatarUrl} radius="xl" />

          <div>
            <Text>{value}</Text>
          </div>
        </Group>
      </div>
    )
  },
)
