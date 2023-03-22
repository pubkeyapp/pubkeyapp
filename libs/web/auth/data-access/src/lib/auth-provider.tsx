import { Button, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useWalletModal } from '@pubkeyapp/wallet-adapter-mantine-ui'
import {
  AnonRequestChallengeDocument,
  AnonRespondChallengeDocument,
  GetMeDocument,
  useGetMeQuery,
  User,
  UserLogoutDocument,
} from '@pubkeyapp/web/util/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useClient } from 'urql'

export type AuthLoginInput = { publicKey: string }

export interface AuthProviderContext {
  error?: string
  loading: boolean
  loggedIn: boolean
  login: (input: AuthLoginInput) => Promise<void>
  logout: () => Promise<void>
  user: User | undefined
  refresh: () => void
}

const AuthProviderContext = createContext<AuthProviderContext>({} as AuthProviderContext)
function AuthProvider({ children }: { children: ReactNode }) {
  const { connected, connecting, disconnect, publicKey, signMessage } = useWallet()
  const { setVisible } = useWalletModal()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [{ data, fetching }] = useGetMeQuery()
  const client = useClient()
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (!data?.me) return
    setUser(data.me)
  }, [data?.me])

  useEffect(() => {
    if (fetching || !data || connecting) return

    if (!connected) {
      // console.log('Wallet disconnected, showing modal.')
      modals.open({
        title: 'Wallet Disconnected',
        centered: true,
        children: (
          <Stack>
            <Text>Please connect your wallet to continue.</Text>
            <Button
              onClick={() => {
                modals.closeAll()
                setVisible(true)
              }}
            >
              Connect
            </Button>
          </Stack>
        ),
      })
      return
    }

    if (data?.me) {
      console.log(`User authenticated: ${data.me.username}`)
      setUser(data.me)
    } else {
      if (connected && publicKey) {
        console.log(`AuthProvider: connected: ${connected} => ${publicKey}`)
        login({ publicKey: publicKey.toString() })
      }
    }
    setLoading(false)
  }, [fetching, data, connected, publicKey])

  const login = async (input: AuthLoginInput) => {
    if (!signMessage) {
      setError('No signMessage function available.')
      throw new Error('No signMessage function available.')
    }
    setError(undefined)
    setLoading(true)

    console.log(`Logging in with keypair: ${input.publicKey}`)
    const requestChallenge = await client
      .query(AnonRequestChallengeDocument, { publicKey: input.publicKey })
      .toPromise()

    if (requestChallenge.error) {
      setError(requestChallenge.error.message || 'Unknown error')
      throw requestChallenge.error
    }

    const challenge = requestChallenge.data.result.challenge

    if (!challenge) {
      setError('No challenge received.')
      throw new Error('No challenge received.')
    }

    const message = `${requestChallenge.data.result.message} \n\nChallenge: ${challenge}`
    const signature = await signMessage(Uint8Array.from(Buffer.from(message, 'utf-8')))

    const respondChallenge = await client
      .mutation(AnonRespondChallengeDocument, {
        publicKey: input.publicKey,
        challenge: message,
        signature: bs58.encode(signature),
      })
      .toPromise()

    if (respondChallenge.error) {
      console.log('respondChallenge.error', respondChallenge.error)
      // setError(respondChallenge.error.message || 'Unknown error')
      // throw respondChallenge.error
    }
    await client.query(GetMeDocument, {}).toPromise()
    setLoading(false)
  }
  const logout = async () => {
    setLoading(true)
    setError(undefined)
    setUser(undefined)
    await client.mutation(UserLogoutDocument, {}).toPromise()
    await new Promise((resolve) => setTimeout(resolve, 500))
    await disconnect()

    setLoading(false)
    setTimeout(() => {
      navigate('/login')
      location.pathname = '/login'
    }, 10)
  }

  const value = {
    error,
    loading,
    login,
    loggedIn: !!data?.me,
    logout,
    user,
    refresh: () => {
      return client
        .query(GetMeDocument, {})
        .toPromise()
        .then((res) => setUser(res?.data?.me))
    },
  }
  return <AuthProviderContext.Provider value={value}>{children}</AuthProviderContext.Provider>
}

const useAuth = () => useContext(AuthProviderContext)

export { AuthProvider, useAuth }
