import { Button, Paper, useMantineTheme } from '@mantine/core'
import { useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { formFieldSelect, formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreatePageInput, useAdminUsersQuery } from '@pubkeyapp/web/util/sdk'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminPageCreateFeature() {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { createItem } = useAdminPage()
  const [{ data: userData }] = useAdminUsersQuery()

  const createPage = async (page: Partial<AdminCreatePageInput>): Promise<boolean> => {
    return createItem(page as AdminCreatePageInput).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/pages/${res.id}`)
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

  const fields: UiFormField<AdminCreatePageInput>[] = [
    formFieldText('title', {
      label: 'Page title',
      description: 'The title of the page.',
      required: true,
    }),
    formFieldTextarea('description', {
      label: 'Page description',
      description: 'The description of the page.',
      required: false,
    }),
    formFieldSelect('ownerId', {
      label: 'Page owner',
      description: 'Set the owner of this page. Leave blank to make you the owner.',
      options: [...userOptions],
    }),
  ]

  return (
    <UiPage title={`Create Page`} leftAction={<UiBackButton />}>
      <Paper withBorder radius="md" p={theme.spacing.md}>
        <UiForm<AdminCreatePageInput>
          fields={fields}
          model={{ title: '', description: '', ownerId: '' }}
          submit={createPage}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
