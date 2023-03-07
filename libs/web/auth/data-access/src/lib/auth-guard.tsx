import { UiErrorFull, UiFullPage, UiLoader } from '@pubkeyapp/web/ui/core'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './auth-provider'

export function AuthGuard({ redirectTo }: { redirectTo: string }) {
  const { error, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <UiFullPage>
        <UiLoader />
      </UiFullPage>
    )
  }

  if (error) {
    return (
      <UiFullPage>
        <UiErrorFull error={error} />
      </UiFullPage>
    )
  }

  return user ? <Outlet /> : <Navigate replace to={redirectTo} state={{ from: location }} />
}
