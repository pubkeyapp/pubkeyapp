import { Button } from '@mantine/core'
import { Page } from '@pubkeyapp/sdk'
import React from 'react'

export function GatewayPage({ page }: { page: Page }) {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </div>
  )
}
