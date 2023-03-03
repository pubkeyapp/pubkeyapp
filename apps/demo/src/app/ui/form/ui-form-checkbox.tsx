import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormCheckbox<T> = Omit<UiFormField<T>, 'key' | 'options' | 'rows' | 'type'>

export function formFieldCheckbox<T>(key: keyof T, options: UiFormCheckbox<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Checkbox,
    ...options,
  }
}
