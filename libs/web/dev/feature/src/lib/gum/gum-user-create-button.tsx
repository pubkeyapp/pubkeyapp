import { useCreateUser } from '@gumhq/react-sdk'
import { Button } from '@mantine/core'
import { UiError } from '@pubkeyapp/web/ui/core'

import { useGumApp } from './use-gum-app'

export function GumUserCreateButton() {
  const { sdk, owner, refresh } = useGumApp()
  const { create, isCreatingUser: loading, createUserError: error } = useCreateUser(sdk)

  if (error) {
    console.error(error)
    return <UiError error={error} />
  }

  return (
    <Button size="md" radius="xl" loading={loading} onClick={() => create(owner).then(() => refresh())}>
      Create User
    </Button>
  )
}
