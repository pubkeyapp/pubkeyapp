import { UiErrorFull } from '@pubkeyapp/web/ui/core'
import { UserRole } from '@pubkeyapp/web/util/sdk'
import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from './auth-provider'

export function UserRoleGuard({ element, role }: { element?: ReactElement; role: UserRole }) {
  const { user } = useAuth()
  return user?.role === role ? <Outlet /> : element ?? <UiErrorFull error={`You need the ${role} role`} />
}
