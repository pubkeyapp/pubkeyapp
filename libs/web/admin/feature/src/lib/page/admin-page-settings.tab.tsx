import { Button, Paper, Stack } from '@mantine/core'
import { UiDebugModal } from '@pubkeyapp/web/ui/core'
import { formFieldSelect, formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdatePageInput, Page, useAdminGetProfilesQuery } from '@pubkeyapp/web/util/sdk'
import { useMemo } from 'react'

export function AdminPageSettingsTab({
  page,
  updatePage,
}: {
  page: Page
  updatePage: (page: Partial<AdminUpdatePageInput>) => Promise<boolean>
}) {
  const [{ data: profileData }] = useAdminGetProfilesQuery()
  const profileOptions: { label: string; value: string; disabled?: boolean }[] = useMemo(
    () =>
      (profileData?.items ?? []).map((profile) => ({
        label: `${profile.name} - ${profile.type}`,
        value: profile.id ?? '',
        disabled: !!profile.page,
      })) ?? [],
    [profileData],
  )

  const fields: UiFormField<AdminUpdatePageInput>[] = [
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
    formFieldSelect('profileId', {
      label: 'Profile Id',
      description: 'Set the owner of this profile.',
      options: [...profileOptions],
    }),
  ]

  return (
    <Paper>
      <UiForm<AdminUpdatePageInput>
        fields={fields}
        model={{
          title: page.title ?? '',
          description: page.description ?? '',
          profileId: page.profile?.id ?? '',
        }}
        submit={updatePage}
      >
        {page.profile ? ' ' : 'No profile assigned'}
        <Button type="submit">Submit</Button>
      </UiForm>
      <Stack align="center" mt={24} spacing="sm">
        <UiDebugModal data={page} />
      </Stack>
    </Paper>
  )
}
