import { Button, Paper } from '@mantine/core'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreateClusterInput, ClusterType, useAdminCreateClusterMutation } from '@pubkeyapp/web/util/sdk'
import { useNavigate } from 'react-router-dom'

export function AdminClusterCreateFeature() {
  const navigate = useNavigate()
  const [, createItem] = useAdminCreateClusterMutation()

  const createCluster = async (input: Partial<AdminCreateClusterInput>): Promise<boolean> => {
    return createItem({ input: input as AdminCreateClusterInput }).then((res) => {
      navigate(`/admin/clusters/${res?.data?.item?.id}`)
      return !!res
    })
  }

  const userOptions: { label: string; value: string }[] = Object.keys(ClusterType).map((key) => ({
    label: key.replace('Solana', 'Solana '),
    value: key,
  }))

  const fields: UiFormField<AdminCreateClusterInput>[] = [
    formFieldSelect('type', {
      label: 'Cluster type',
      description: 'Select the type.',
      options: [...userOptions],
    }),
    formFieldText('name', {
      label: 'Cluster name',
      description: 'The name of the cluster.',
      required: true,
    }),
    formFieldText('endpoint', {
      label: 'Cluster endpoint',
      description: 'The endpoint of the cluster.',
      required: true,
    }),
  ]

  return (
    <UiPage title={`Create Cluster`} leftAction={<UiBackButton />}>
      <Paper>
        <UiForm<AdminCreateClusterInput>
          fields={fields}
          model={{ name: '', endpoint: '', type: ClusterType.SolanaMainnet }}
          submit={createCluster}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
