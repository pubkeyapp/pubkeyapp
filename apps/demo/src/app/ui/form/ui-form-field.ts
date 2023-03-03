export enum UiFormFieldType {
  Checkbox = 'checkbox',
  Input = 'input',
  Select = 'select',
  Textarea = 'textarea',
}

export interface UiFormField<T> {
  key: keyof T
  label: string
  options?: { label: string; value: string }[]
  placeholder?: string
  required?: boolean
  rows?: number
  type: UiFormFieldType
}
