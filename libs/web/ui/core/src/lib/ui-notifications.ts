import { NotificationProps, showNotification } from '@mantine/notifications'

export function showNotificationError(
  message?: string,
  { title, ...props }: Omit<NotificationProps, 'message'> = {},
): boolean {
  showNotification({
    title: title ?? 'An error occurred',
    message: message ?? 'Unknown error',
    color: 'red',
    ...props,
  })
  return false
}

export function showNotificationSuccess(
  message?: string,
  { title, ...props }: Omit<NotificationProps, 'message'> = {},
): boolean {
  showNotification({
    message: message ?? 'Success',
    title: title ?? 'Success',
    color: 'green',
    ...props,
  })
  return true
}
