import { Button, CopyButton, Input } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { Page } from '@pubkeyapp/sdk'
import React from 'react'

export function PageShareCopyButton({ page }: { page: Page }) {
  return (
    <form>
      <CopyButton value={page.viewUrl}>
        {({ copied, copy }) => (
          <Input
            size="lg"
            onClick={copy}
            sx={{ cursor: 'pointer' }}
            icon={<PubKeyLogo type="mark" size={36} />}
            placeholder={page.viewUrl}
            readOnly
            rightSection={
              <Button size="lg" color={copied ? 'teal' : 'blue'} onClick={copy} mr={64}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            }
          />
        )}
      </CopyButton>
    </form>
  )
}
