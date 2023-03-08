import { Button, Paper, useMantineTheme } from '@mantine/core'
import { useAdminDomain } from '@pubkeyapp/web/admin/data-access'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { formFieldCheckbox, formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreateDomainInput, useAdminUsersQuery } from '@pubkeyapp/web/util/sdk'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminDomainCreateFeature() {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { createItem } = useAdminDomain()
  const [{ data: userData }] = useAdminUsersQuery()

  const createDomain = async (domain: Partial<AdminCreateDomainInput>): Promise<boolean> => {
    return createItem(domain as AdminCreateDomainInput).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/domains/${res.id}`)
      }
      return !!res
    })
  }

  const userOptions: { label: string; value: string }[] = useMemo(() => {
    return (
      userData?.items?.map((user) => {
        return { label: `${user.name} - ${user.username}`, value: user.id ?? '' }
      }) ?? []
    )
  }, [userData])

  const fields: UiFormField<AdminCreateDomainInput>[] = [
    formFieldText('name', {
      label: 'Domain name',
      description: 'The name of the domain.',
      required: true,
    }),
    formFieldCheckbox('premium', {
      label: 'Premium domain',
      description: 'Select if this domain is a premium domain.',
    }),
    formFieldCheckbox('private', {
      label: 'Private',
      description: 'Select if this domain is private.',
    }),
    formFieldCheckbox('secure', {
      label: 'Secure',
      description: 'Select if this domain is using https.',
    }),
    formFieldSelect('ownerId', {
      label: 'Domain owner',
      description: 'Set the owner of this domain. Leave blank to make you the owner.',
      options: [...userOptions],
    }),
  ]

  return (
    <UiPage title={`Create Domain`} leftAction={<UiBackButton />}>
      <Paper>
        <UiForm<AdminCreateDomainInput>
          fields={fields}
          model={{ name: '', premium: false, private: false, secure: true, ownerId: '' }}
          submit={createDomain}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
