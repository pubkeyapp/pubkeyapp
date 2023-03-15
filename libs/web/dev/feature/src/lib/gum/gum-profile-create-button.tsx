import { Button } from '@mantine/core'

import { Namespace } from './gum-interfaces'
import { GumProfileTypeIcon } from './use-gum-app'

export function GumProfileCreateButton({ onClick, type }: { onClick: () => void; type: Namespace }) {
  return (
    <Button
      size="xl"
      radius="xl"
      variant="light"
      onClick={onClick}
      leftIcon={<GumProfileTypeIcon type={type} size={32} />}
    >
      Create {type} Profile
    </Button>
  )
}
