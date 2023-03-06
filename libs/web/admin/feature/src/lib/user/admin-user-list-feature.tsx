import { Button } from '@mantine/core'
import { showNotificationError, showNotificationSuccess, UiError, UiFullPage, UiLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { UserTable } from '@pubkeyapp/web/user/ui'
import { AdminDeleteUserDocument, useAdminUsersQuery, User } from '@pubkeyapp/web/util/sdk'
import { IconUserPlus, IconUsers } from '@tabler//icons-react'
import { Link } from 'react-router-dom'
import { useClient } from 'urql'

export function AdminUserListFeature() {
  const [{ data, error, fetching }] = useAdminUsersQuery()
  const client = useClient()

  const deleteUser = async (user: User) => {
    if (!window.confirm(`Are you sure you want to delete ${user.username}?`)) return
    console.log(user)
    client
      .mutation(AdminDeleteUserDocument, { userId: user.id })
      .toPromise()
      .then((res) => {
        console.log(res)
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Invite created')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  if (fetching) {
    return (
      <UiFullPage>
        <UiLoader />
      </UiFullPage>
    )
  }
  if (error) {
    return (
      <UiFullPage>
        <UiError error={error.message} />
      </UiFullPage>
    )
  }

  return (
    <UiPage
      title="Users"
      leftAction={<IconUsers />}
      rightAction={
        <Button
          component={Link}
          to="create"
          size="xs"
          variant="default"
          leftIcon={<IconUserPlus size={16} stroke={1.5} />}
        >
          Create User
        </Button>
      }
    >
      <UserTable users={data?.items ?? []} deleteUser={deleteUser} />
    </UiPage>
  )
}
