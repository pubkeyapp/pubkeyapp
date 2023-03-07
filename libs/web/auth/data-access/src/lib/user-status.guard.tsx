import { UiErrorFull } from '@pubkeyapp/web/ui/core'
import { UserStatus } from '@pubkeyapp/web/util/sdk'
import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from './auth-provider'

export function UserStatusGuard({ status, element }: { status: UserStatus; element?: ReactElement }) {
  const { user } = useAuth()
  return user?.status === status ? <Outlet /> : element ?? <UiErrorFull error={`Your account is not ${status}`} />
}
