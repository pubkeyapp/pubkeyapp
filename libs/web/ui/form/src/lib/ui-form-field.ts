export enum UiFormFieldType {
  Checkbox = 'checkbox',
  Date = 'Date',
  Number = 'Number',
  Password = 'Password',
  Select = 'Select',
  Text = 'Text',
  Textarea = 'textarea',
}

export interface UiFormField<T> {
  key: keyof T
  label?: string
  description?: string
  options?: { label: string; value: string }[]
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
  rows?: number
  type: UiFormFieldType
}
