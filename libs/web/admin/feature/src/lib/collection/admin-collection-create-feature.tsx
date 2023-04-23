import { Button, Paper, useMantineTheme } from '@mantine/core'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import {
  AdminCreateCollectionInput,
  NetworkType,
  useAdminCreateCollectionMutation,
  useAdminGetUsersQuery,
} from '@pubkeyapp/web/util/sdk'
import { useNavigate } from 'react-router-dom'

export function AdminCollectionCreateFeature() {
  const navigate = useNavigate()
  const [, createItem] = useAdminCreateCollectionMutation()

  const createCollection = async (input: Partial<AdminCreateCollectionInput>): Promise<boolean> => {
    return createItem({ input: input as AdminCreateCollectionInput }).then((res) => {
      navigate(`/admin/collections/${res?.data?.item?.id}`)
      return !!res
    })
  }

  const userOptions: { label: string; value: string }[] = Object.keys(NetworkType).map((key) => ({
    label: key.replace('Solana', 'Solana '),
    value: key,
  }))

  const fields: UiFormField<AdminCreateCollectionInput>[] = [
    formFieldSelect('network', {
      label: 'Collection network',
      description: 'Select the network.',
      options: [...userOptions],
    }),
    formFieldText('name', {
      label: 'Collection name',
      description: 'The name of the collection.',
      required: true,
    }),
    formFieldText('address', {
      label: 'Collection address',
      description: 'The address of the collection.',
      required: true,
    }),
  ]

  return (
    <UiPage title={`Create Collection`} leftAction={<UiBackButton />}>
      <Paper>
        <UiForm<AdminCreateCollectionInput>
          fields={fields}
          model={{ name: '', address: '', network: NetworkType.SolanaMainnet }}
          submit={createCollection}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
