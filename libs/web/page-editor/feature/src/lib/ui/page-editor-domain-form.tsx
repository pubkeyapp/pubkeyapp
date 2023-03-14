import { Alert, Anchor, Badge, Button, Group, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import {
  Domain,
  Page,
  PageDomain,
  UserAddPageDomainDocument,
  UserGetPageDomainDocument,
  useUserGetDomainsQuery,
} from '@pubkeyapp/web/util/sdk'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClient } from 'urql'

export function PageEditorDomainForm({ button, page }: { button?: ReactNode; page: Page }) {
  const client = useClient()

  const [{ data, fetching }] = useUserGetDomainsQuery()

  const [checked, setChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [checkedDomain, setCheckedDomain] = useState<Domain | undefined>(undefined)
  const [found, setFound] = useState<PageDomain | undefined>(undefined)
  const [selectedDomain, setSelectedDomain] = useState<Domain | undefined>()
  const [selectedPath] = useState<string>(slugify(page.profile?.username ?? ''))

  const domainOptions = useMemo(() => {
    if (!data?.items?.length) return []
    return (
      data?.items?.map((domain) => ({
        label: `${domain.name} - (${domain.premium ? 'Premium' : 'Free'})  (${domain.private ? 'Private' : 'Public'}) `,
        value: domain.id ?? '',
      })) ?? []
    )
  }, [data?.items])

  useEffect(() => {
    if ((checkedDomain && checkedDomain.id === selectedDomain?.id) || !selectedDomain) {
      console.log(' I already checked this domain! ', { checkedDomain, selectedDomain })
      return
    }
    setCheckedDomain(selectedDomain)
    checkPageDomain()
  }, [checked, found, selectedDomain?.id, data?.items])

  useEffect(() => {
    if (selectedDomain || !data?.items?.length) return
    setSelectedDomain(data?.items?.[0])
  }, [selectedDomain, data?.items])

  const checkPageDomain = async (): Promise<boolean> => {
    if (!selectedDomain?.id || !selectedPath) return false
    setChecked(false)
    setFound(undefined)
    setLoading(true)
    return client
      .query(UserGetPageDomainDocument, { domainId: selectedDomain?.id, path: selectedPath })
      .toPromise()
      .then((userPageDomain) => {
        setChecked(true)
        setFound(userPageDomain.data?.item)
        setLoading(false)

        return !!userPageDomain.data?.item
      })
  }

  const addPageDomain = async (): Promise<boolean> => {
    if (!selectedDomain?.id || !selectedPath) return false
    setLoading(true)
    return client
      .mutation(UserAddPageDomainDocument, {
        pageId: page.id,
        input: { domainId: selectedDomain?.id, path: selectedPath },
      })
      .toPromise()
      .then((userAddPageDomain) => {
        const found = !!userAddPageDomain.data?.item
        setLoading(false)
        return found
      })
  }

  const canCreate = useMemo(() => {
    console.log('canCreate', { loading, found, checked })
    return !loading && !found?.id && checked
  }, [loading, found, checked])

  const ownsFound = data?.items?.find((domain) => domain.id === selectedDomain?.id)

  if (fetching) {
    return <UiLoader />
  }

  if (!domainOptions?.length) {
    return (
      <Stack spacing={2}>
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="yellow" radius="lg" variant="outline">
          This PubKey instance has no domains configured. Ask your administrator to configure domains.
        </Alert>
      </Stack>
    )
  }

  return (
    <Stack py={8}>
      <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {data?.items?.map((domain) => (
          <Button
            key={domain.id}
            radius="lg"
            h={128}
            variant={domain.id === selectedDomain?.id ? 'filled' : 'default'}
            onClick={() => setSelectedDomain(domain)}
          >
            <Stack align="center">
              <Group spacing={4}>
                <Text size="lg" weight={500}>
                  {domain.name}
                </Text>
              </Group>
              <Tooltip
                label={
                  domain.premium
                    ? 'Premium domains are free while PubKey is in Beta!'
                    : 'This domain will always be free to use'
                }
              >
                <Badge color={domain.premium ? 'green' : 'brand'}>{domain.premium ? 'Premium' : 'Free'}</Badge>
              </Tooltip>
            </Stack>
          </Button>
        )) ?? null}
      </SimpleGrid>

      {found && !ownsFound ? (
        <Stack align="center" spacing="xl" mt="xl">
          <Text size={24} sx={{ lineHeight: 1 }}>
            This domain is unavailable :(
          </Text>
          <Anchor component={Link} to="." color="brand" weight={500} size={36} sx={{ lineHeight: 1 }} my={24}>
            {selectedDomain?.name}/{selectedPath}
          </Anchor>
        </Stack>
      ) : (
        <Stack align="center" spacing="xl" mt="xl">
          <Text size={24} sx={{ lineHeight: 1 }}>
            This domain is {found && ownsFound ? 'yours already' : 'available'}!
          </Text>
          <Anchor component={Link} to="." color="brand" weight={500} size={36} sx={{ lineHeight: 1 }} my={24}>
            {selectedDomain?.name}/{selectedPath}
          </Anchor>
          <Group>
            <Button loading={loading} size="xl" disabled={!canCreate} onClick={addPageDomain} color="green">
              Add Domain
            </Button>
            {button}
          </Group>
        </Stack>
      )}
    </Stack>
  )
}

export function slugify(str: string = '') {
  return (str ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
