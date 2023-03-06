import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormDate<T> = Omit<UiFormField<T>, 'key' | 'options' | 'rows' | 'type'> & {
  maxDate?: Date
  minDate?: Date
}

export function formFieldDate<T>(key: keyof T, options: UiFormDate<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Date,
    ...options,
  }
}
