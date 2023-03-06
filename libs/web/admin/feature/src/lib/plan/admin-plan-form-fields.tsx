import { formFieldNumber, formFieldText, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdatePlanInput } from '@pubkeyapp/web/util/sdk'

export const adminPlanFormFields: UiFormField<AdminUpdatePlanInput>[] = [
  formFieldText('name', {
    label: 'Name',
    description: 'Set the name for this plan.',
  }),
  formFieldText('description', {
    label: 'Description',
    description: 'Set the description for this plan.',
  }),
  formFieldNumber('priceMonth', {
    label: 'Monthly price',
    description: 'Set the monthly price for this plan.',
  }),
  formFieldNumber('priceYear', {
    label: 'Yearly price',
    description: 'Set the yearly price for this plan.',
  }),
]
