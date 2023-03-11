import {
  Alert,
  Checkbox,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'

import { IconLock } from '@tabler/icons-react'
import React, { ReactNode } from 'react'
import { UiFormDate } from './ui-form-date'
import { UiFormField, UiFormFieldType } from './ui-form-field'

function cleanupValues<T>({ fields, values }: { fields: UiFormField<T>[]; values: Partial<T> }): Partial<T> {
  type fieldKey = keyof T
  const fieldKeys: Array<fieldKey> = fields.map((field) => field.key)

  return Object.keys(values as Record<fieldKey, unknown>).reduce((acc, key) => {
    if (fieldKeys.includes(key as fieldKey)) {
      acc[key as fieldKey] = values[key as fieldKey]
    }
    return acc
  }, {} as Partial<T>)
}

export function UiForm<T>({
  children,
  model,
  fields,
  submit,
  validate,
}: {
  children?: ReactNode
  model: T
  fields: UiFormField<T>[]
  submit: (input: Partial<T>) => Promise<boolean | undefined>
  validate?: (input: Partial<T>) => Record<string, string>
}) {
  const theme = useMantineTheme()
  const form = useForm<T>({
    clearInputErrorOnChange: true,
    initialValues: model,
    validate,
  })

  const handleSubmit = async (values: T) => {
    const input = cleanupValues({ fields, values })
    const result = await submit(input)

    if (!result) {
      form.setFieldError('submit', 'An error occurred')
    } else {
      form.resetTouched()
      form.reset()
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={32}>
        {fields.map((field) => {
          switch (field.type) {
            case UiFormFieldType.Checkbox:
              return (
                <Checkbox
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  {...form.getInputProps(field.key, { type: 'checkbox' })}
                />
              )
            case UiFormFieldType.Date:
              return (
                <DatePicker
                  key={field.key?.toString()}
                  placeholder={field.placeholder ?? field.label}
                  maxDate={(field as UiFormDate<T>).maxDate}
                  minDate={(field as UiFormDate<T>).minDate}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Number:
              return (
                <NumberInput
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Text:
              return (
                <TextInput
                  size="lg"
                  radius="xl"
                  styles={{ input: { marginTop: 16 } }}
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Password:
              return (
                <PasswordInput
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  icon={<IconLock size={16} />}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Select:
              console.log('form.getInputProps(field.key)', form.getInputProps(field.key))
              return (
                <Select
                  size="lg"
                  radius="xl"
                  key={field.key?.toString()}
                  description={field.description}
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
                  size="lg"
                  radius="xl"
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  rows={field.rows ?? 5}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            default:
              return <Alert>Unknown form type: {field.type}</Alert>
          }
        })}
        {children ? children : null}
      </Stack>
    </form>
  )
}
