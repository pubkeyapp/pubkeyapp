import { Button, Paper, Stack, useMantineTheme } from '@mantine/core'
import { UiDebugModal } from '@pubkeyapp/web/ui/core'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdatePageInput, Page } from '@pubkeyapp/web/util/sdk'

export function AdminPageSettingsTab({
  page,
  updatePage,
}: {
  page: Page
  updatePage: (page: Partial<AdminUpdatePageInput>) => Promise<boolean>
}) {
  const theme = useMantineTheme()

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
  ]

  return (
    <Paper withBorder radius="md" p={theme.spacing.md}>
      <UiForm<AdminUpdatePageInput>
        fields={fields}
        model={{
          title: page.title,
          description: page.description,
        }}
        submit={updatePage}
      >
        <Button type="submit">Submit</Button>
      </UiForm>
      <Stack align="center" mt={24} spacing="sm">
        <UiDebugModal data={page} />
      </Stack>
    </Paper>
  )
}
