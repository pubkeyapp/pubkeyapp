import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm } from '@pubkeyapp/web/ui/form'

export interface PageBlockLinkInput {
  link: string
  label: string
}

export function PageBlockFormLink({
  cancel,
  model,
  submit,
}: {
  cancel: () => void
  model: PageBlockLinkInput
  submit: (data: PageBlockLinkInput) => Promise<boolean>
}) {
  return (
    <UiForm<PageBlockLinkInput>
      fields={[
        formFieldText('label', {
          label: 'Label',
          description: 'The label of the link',
          required: true,
        }),
        formFieldText('link', {
          label: 'Link',
          description: 'The link to the page',
          required: true,
        }),
      ]}
      model={
        model ?? {
          link: '',
          label: '',
        }
      }
      submit={(data) => submit(data as PageBlockLinkInput)}
    >
      <Group>
        <Button type="submit">Add</Button>
        <Button color="gray" onClick={cancel}>
          Cancel
        </Button>
      </Group>
    </UiForm>
  )
}
