import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormTextArea<T> = Omit<UiFormField<T>, 'key' | 'options' | 'type'> & {
  rows?: number
}

export function formFieldTextarea<T>(key: keyof T, options: UiFormTextArea<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Textarea,
    ...options,
  }
}
