import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormInput<T> = Omit<UiFormField<T>, 'key' | 'options' | 'rows' | 'type'>

export function formFieldNumber<T>(key: keyof T, options: UiFormInput<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Number,
    ...options,
  }
}
