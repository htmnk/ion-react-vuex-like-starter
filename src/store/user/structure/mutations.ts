
import { User } from '../../../models/User';
import { AxiosError } from 'axios';

export const setLoading = (isLoading: boolean) => ({
  type: 'set-loading',
  isLoading
} as const);

export const setError = (error: AxiosError) => ({
  type: 'set-error',
  error
} as const)

export const setUsers = (users: User[]) => ({
  type: 'set-users',
  users
} as const);

export const addUser = (user: User) => ({
  type: 'add-user',
  user
} as const);