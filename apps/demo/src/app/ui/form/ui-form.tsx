import { Alert, Checkbox, Group, Select, Stack, Textarea, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { ReactNode } from 'react'
import { UiFormField, UiFormFieldType } from './ui-form-field'

export function UiForm<T>({
  children,
  data,
  fields,
  submit,
  validate,
}: {
  children: ReactNode
  data: T
  fields: UiFormField<T>[]
  submit: (data: Partial<T>) => void
  validate?: (data: T) => Record<string, string>
}) {
  const theme = useMantineTheme()
  const form = useForm<T>({ initialValues: data, validate })
  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Stack spacing={theme.spacing.md}>
        {fields.map((field) => {
          switch (field.type) {
            case UiFormFieldType.Input:
              return (
                <TextInput
                  key={field.key.toString()}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Checkbox:
              return (
                <Checkbox
                  key={field.key.toString()}
                  label={field.label}
                  required={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Select:
              return (
                <Select
                  key={field.key.toString()}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  data={field.options ?? []}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Textarea:
              return (
                <Textarea
                  key={field.key.toString()}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  rows={field.rows ?? 3}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            default:
              return <Alert>Unknown form type: {field.type}</Alert>
          }
        })}
        <Group position="right" mt="md">
          {children}
        </Group>
      </Stack>
    </form>
  )
}
