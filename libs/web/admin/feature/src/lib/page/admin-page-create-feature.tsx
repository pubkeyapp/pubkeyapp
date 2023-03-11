import { Button, Paper, useMantineTheme } from '@mantine/core'
import { useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { formFieldSelect, formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreatePageInput, useAdminGetProfilesQuery, useAdminGetUsersQuery } from '@pubkeyapp/web/util/sdk'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminPageCreateFeature() {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { createItem } = useAdminPage()
  const [{ data: userData }] = useAdminGetUsersQuery()
  const [{ data: profileData }] = useAdminGetProfilesQuery()

  const createPage = async (page: Partial<AdminCreatePageInput>): Promise<boolean> => {
    return createItem(page as AdminCreatePageInput).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/pages/${res.id}`)
      }
      return !!res
    })
  }

  const profileOptions: { label: string; value: string; disabled?: boolean }[] = useMemo(
    () =>
      (profileData?.items ?? []).map((profile) => ({
        label: `${profile.name} - ${profile.type}`,
        value: profile.id ?? '',
        disabled: !!profile.page,
      })) ?? [],
    [profileData],
  )

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
    formFieldSelect('profileId', {
      label: 'Profile Id',
      description: 'Set the owner of this profile.',
      options: [...profileOptions],
    }),
  ]

  return (
    <UiPage title={`Create Page`} leftAction={<UiBackButton />}>
      <Paper>
        <UiForm<AdminCreatePageInput>
          fields={fields}
          model={{ title: '', description: '', ownerId: '', profileId: '' }}
          submit={createPage}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
