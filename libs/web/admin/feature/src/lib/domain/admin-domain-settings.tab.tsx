import { Button, Paper, useMantineTheme } from '@mantine/core'
import { formFieldCheckbox, formFieldNumber, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdateDomainInput, Domain } from '@pubkeyapp/web/util/sdk'

export function AdminDomainSettingsTab({
  domain,
  updateDomain,
}: {
  domain: Domain
  updateDomain: (domain: Partial<AdminUpdateDomainInput>) => Promise<boolean>
}) {
  const theme = useMantineTheme()

  const fields: UiFormField<AdminUpdateDomainInput>[] = [
    formFieldNumber('order', {
      label: 'Order',
      description: 'Sort order of this domain.',
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
  ]

  return (
    <Paper withBorder radius="md" p={theme.spacing.md}>
      <UiForm<AdminUpdateDomainInput>
        fields={fields}
        model={{
          order: domain.order,
          premium: domain.premium,
          private: domain.private,
        }}
        submit={updateDomain}
      >
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
