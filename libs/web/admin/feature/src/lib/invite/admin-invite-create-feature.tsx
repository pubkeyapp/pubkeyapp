import { Button, Paper, useMantineTheme } from '@mantine/core'
import { useAdminInvite } from '@pubkeyapp/web/invite/data-access'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { formFieldDate, formFieldNumber, formFieldSelect, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreateInviteInput, useAdminGetUsersQuery } from '@pubkeyapp/web/util/sdk'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminInviteCreateFeature() {
  const navigate = useNavigate()
  const { createItem } = useAdminInvite()
  const [{ data: userData }] = useAdminGetUsersQuery()

  const createInvite = async (invite: AdminCreateInviteInput): Promise<boolean> => {
    return createItem(invite).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/invites/${res.id}`)
      }
      return !!res
    })
  }

  const userOptions: { label: string; value: string }[] = useMemo(() => {
    return (
      userData?.items?.map((user) => {
        return { label: `${user.username}`, value: user.id ?? '' }
      }) ?? []
    )
  }, [userData])

  const fields: UiFormField<AdminCreateInviteInput>[] = [
    formFieldNumber('maxUses', {
      label: 'Maximum uses',
      description: 'Set the maximum number of times this invite can be used. Set to zero for unlimited.',
    }),
    formFieldDate('expiresAt', {
      label: 'Invite expiration',
      description: 'Set the date this invite expires. Leave blank for no expiration.',
      minDate: new Date(),
    }),
    formFieldSelect('ownerId', {
      label: 'Invite owner',
      description: 'Set the owner of this invite. Leave blank to make you the owner.',
      options: [...userOptions],
    }),
  ]

  return (
    <UiPage title={`Create Invite`} leftAction={<UiBackButton />}>
      <Paper>
        <UiForm<AdminCreateInviteInput>
          fields={fields}
          model={{ maxUses: 0, expiresAt: '', ownerId: '' }}
          submit={createInvite}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
