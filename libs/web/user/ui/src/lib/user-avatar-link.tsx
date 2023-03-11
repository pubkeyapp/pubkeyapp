import { Avatar } from '@mantine/core'
import { User } from '@pubkeyapp/sdk'
import { Link } from 'react-router-dom'

export function UserAvatarLink({ user }: { user: User | undefined }) {
  return (
    <Avatar
      component={Link}
      to={`${user?.profileUrl}`}
      src={user?.profile?.avatarUrl}
      alt={`${user?.username}`}
      radius="xl"
    />
  )
}
