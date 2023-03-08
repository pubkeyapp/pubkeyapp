import { Button, Group } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { Page, PageType, UserCreatePageInput, useUserCreatePageMutation } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { PageTypeColor, PageTypeIcon } from './page-type-icon'

export function PageCreateButtons({ pages }: { pages: Page[] }) {
  const types = [PageType.Personal, PageType.Professional, PageType.Gaming, PageType.Degen]
  const missingTypes = types.filter((type) => !pages.find((page) => page.type === type))
  const { user } = useAuth()
  const [_, createPageMutation] = useUserCreatePageMutation()

  const createPage = async (type: PageType) => {
    const input: UserCreatePageInput = {
      type,
      title: user?.username ?? '',
      description: `This is the ${type} page of ${user?.username}`,
      color: PageTypeColor({ type }),
    }
    createPageMutation({ input: { ...input } })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Page created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Group>
      {missingTypes?.map((type) => (
        <Button
          key={type}
          size="lg"
          variant="default"
          leftIcon={<PageTypeIcon type={type as PageType} size={24} />}
          onClick={() => createPage(type)}
        >
          Create {type} Profile
        </Button>
      ))}
    </Group>
  )
}
