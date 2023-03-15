import { Center, Container } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UiFullPage } from '@pubkeyapp/web/ui/core'
import { UserPid } from '../early/early-feature'

export function PidRoutes() {
  const { user } = useAuth()
  return (
    <UiFullPage>
      {user ? (
        <Center>
          <UserPid user={user} />
        </Center>
      ) : null}
    </UiFullPage>
  )
}
