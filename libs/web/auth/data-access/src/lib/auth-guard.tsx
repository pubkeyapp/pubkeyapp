import { UiError, UiFullPage, UiLoader } from '@pubkeyapp/web/ui/core'
import { UserRole } from '@pubkeyapp/web/util/sdk'
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
        <UiError error={error} />
      </UiFullPage>
    )
  }

  return user ? <Outlet /> : <Navigate replace to={redirectTo} state={{ from: location }} />
}

export function UserRoleGuard({ role }: { role: UserRole }) {
  const { user } = useAuth()
  return user?.role === role ? <Outlet /> : <UiError error={`You need the Admin role`} />
}
