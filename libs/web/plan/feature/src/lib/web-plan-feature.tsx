import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  List,
  Paper,
  rem,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core'
import { Plan, useAnonGetPlansQuery } from '@pubkeyapp/web/util/sdk'
import { IconCheck } from '@tabler/icons-react'
import React, { useMemo, useState } from 'react'

export function WebPlanFeature() {
  const [{ data }] = useAnonGetPlansQuery()
  const [selectCycle, setSelectCycle] = useState<'monthly' | 'yearly'>('monthly')
  const monthly = useMemo(() => selectCycle === 'monthly', [selectCycle])

  return (
    <Container size="xl">
      <Stack spacing="xl">
        <Group position="apart" align="center" px="md" pb="xl">
          <Text size={rem(48)}>Pick the perfect plan</Text>
          <Group>
            <SegmentedControl
              value={selectCycle}
              onChange={(value) => setSelectCycle(value as 'monthly' | 'yearly')}
              data={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
              ]}
            />
          </Group>
        </Group>
        <SimpleGrid cols={4} spacing="md" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {data?.items?.map((plan) => (
            <PlanPricingCard key={plan.id} plan={plan} monthly={monthly} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
export function displayNumber(value?: number | string) {
  return Number(value ?? 0)?.toLocaleString('en-US', { maximumFractionDigits: 2 })
}
// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})
export function PlanPricingCard({ plan, monthly }: { plan: Plan; monthly: boolean }) {
  return (
    <Paper key={plan.id} p="md">
      <Flex direction="column" sx={{ height: '100%' }}>
        <Stack mb="lg">
          <Stack py="xl">
            <Text align="center" size="xl" fw={700}>
              {plan.name}
            </Text>
            <Text align="center" size="nd" color="dimmed" px="md">
              {plan.description}
            </Text>
          </Stack>
          <Stack spacing={0}>
            {monthly ? null : (
              <Text align="center" size="xl">
                {formatter.format((plan.priceYear ?? 0) / 100)}
              </Text>
            )}
            <Text align="center" size="xl" color={monthly ? undefined : 'dimmed'} strikethrough={!monthly}>
              {formatter.format((plan.priceMonth ?? 0) / 100)}
            </Text>
            <Text align="center" color="dimmed">
              Per month, billed {monthly ? 'monthly' : 'yearly'}
            </Text>
          </Stack>
        </Stack>
        <Box sx={{ flexGrow: 10 }} my="lg">
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="brand" size={16} radius="xl">
                <IconCheck size="1rem" />
              </ThemeIcon>
            }
          >
            {plan.features?.map((feature) => (
              <List.Item key={feature.id}>
                <Text size="xs">{feature.name}</Text>
              </List.Item>
            ))}
          </List>
        </Box>
        <Box>
          {plan.available ? (
            <Button fullWidth>Choose {plan.name}</Button>
          ) : (
            <Tooltip label={'This plan will be available soon!'}>
              <Button fullWidth disabled>
                Coming soon
              </Button>
            </Tooltip>
          )}
        </Box>
      </Flex>
    </Paper>
  )
}
