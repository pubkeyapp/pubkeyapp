import { Avatar, Center, Paper, Stack, Text } from '@mantine/core'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UiError } from '@pubkeyapp/web/ui/core'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginFeature() {
  const { user, error } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user])

  return (
    <Stack h={'100%'} justify="center" align="center">
      <Center>
        <Stack>
          {error ? <UiError error={error} /> : null}
          {user ? (
            <div>
              <Paper>
                <Stack align="center">
                  <Avatar src={user.avatarUrl} size="xl" />
                  <Text size="xl">Welcome, {user.username}!</Text>
                </Stack>
              </Paper>
            </div>
          ) : (
            <WalletMultiButton />
          )}
        </Stack>
      </Center>
    </Stack>
  )
}
