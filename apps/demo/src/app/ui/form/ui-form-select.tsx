import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormSelect<T> = Omit<UiFormField<T>, 'key' | 'rows' | 'type'>

export function formFieldSelect<T>(key: keyof T, options: UiFormSelect<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Select,
    ...options,
  }
}
