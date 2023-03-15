import { Button, Group } from '@mantine/core'
import { formFieldTextarea, UiForm } from '@pubkeyapp/web/ui/form'

export interface PageBlockHeaderInput {
  text: string
}

export function PageBlockFormHeader({
  cancel,
  model,
  submit,
}: {
  cancel: () => void
  model: PageBlockHeaderInput
  submit: (data: PageBlockHeaderInput) => Promise<boolean>
}) {
  return (
    <UiForm<PageBlockHeaderInput>
      fields={[
        formFieldTextarea('text', {
          label: 'Text',
          description: 'The text of the header',
          required: true,
          rows: 5,
        }),
      ]}
      model={
        model ?? {
          text: '',
        }
      }
      submit={(data) => submit(data as PageBlockHeaderInput)}
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
