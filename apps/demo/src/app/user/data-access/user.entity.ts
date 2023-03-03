export interface User {
  avatarUrl: string
  bio?: string
  developer?: boolean
  email: string
  firstName?: string
  id: string
  lastName?: string
  location?: string
  phone?: string
  role: UserRole
  username: string
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export function userRoleOptions(): { label: string; value: UserRole }[] {
  return Object.keys(UserRole).map((key: string) => ({ label: key, value: UserRole[key as UserRole] }))
}

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.Admin]: 'pink',
  [UserRole.User]: 'blue',
}

export const DEMO_USERS: User[] = [
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    firstName: 'Robert',
    lastName: 'Wolfkisser',
    id: 'wolfkisser',
    username: 'wolfkisser',
    role: UserRole.Admin,
    email: 'rob_wolf@gmail.com',
    phone: '',
    developer: true,
    bio: '',
    location: '',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    firstName: 'Jill',
    lastName: 'Jailbreaker',
    id: 'jailbreaker',
    username: 'jailbreaker',
    role: UserRole.Admin,
    email: 'jj@breaker.com',
    phone: '',
    developer: false,
    bio: '',
    location: '',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    firstName: 'Henry',
    lastName: 'Silkeater',
    id: 'silkeater',
    username: 'silkeater',
    role: UserRole.User,
    email: 'henry@silkeater.io',
    phone: '',
    developer: false,
    bio: '',
    location: '',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    firstName: 'Bill',
    lastName: 'Horsefighter',
    id: 'horsefighter',
    username: 'horsefighter',
    role: UserRole.User,
    email: 'bhorsefighter@gmail.com',
    phone: '',
    developer: false,
    bio: '',
    location: '',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    firstName: 'Jeremy',
    lastName: 'Footviewer',
    id: 'footviewer',
    username: 'footviewer',
    role: UserRole.User,
    email: 'jeremy@foot.dev',
    phone: '',
    developer: false,
    bio: '',
    location: '',
  },
]
