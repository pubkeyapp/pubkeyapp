import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormPassword<T> = Omit<UiFormField<T>, 'key' | 'options' | 'rows' | 'type'>

export function formFieldPassword<T>(key: keyof T, options: UiFormPassword<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Password,
    ...options,
  }
}
