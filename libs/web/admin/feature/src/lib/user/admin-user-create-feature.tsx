import { showNotificationError, showNotificationSuccess, UiBackButton } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { UserFormCreate } from '@pubkeyapp/web/user/ui'
import { AdminCreateUserInput, useAdminCreateUserMutation, UserRole } from '@pubkeyapp/web/util/sdk'
import { useState } from 'react'

const initialValues: Partial<AdminCreateUserInput> = { publicKey: '', role: UserRole.User }

export function AdminUserCreateFeature() {
  const [, createUserMutation] = useAdminCreateUserMutation()
  const [model, setModel] = useState<Partial<AdminCreateUserInput>>(initialValues)

  const submit = async (input: Partial<AdminCreateUserInput>): Promise<boolean> => {
    const res = await createUserMutation({ input })
    if (res.error) {
      showNotificationError(res.error.message)
      return false
    }
    if (res.data?.item) {
      showNotificationSuccess('User created')
      setModel(initialValues)
      return true
    }
    return false
  }

  return (
    <UiPage title={'Create User'} leftAction={<UiBackButton />}>
      <UserFormCreate model={{ ...model }} submit={submit} />
    </UiPage>
  )
}
