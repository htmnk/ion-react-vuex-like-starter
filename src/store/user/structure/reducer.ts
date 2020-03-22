import { UserState } from './types'
import { UserMutations } from './types';

export function userReducer(state: UserState, mutation: UserMutations): UserState {
  switch (mutation.type) {
    case 'set-loading':
      return { ...state, isLoading: mutation.isLoading }
    case 'set-error':
      return { ...state, error: mutation.error }
    case 'set-users':
      return { ...state, users: [...state.users, ...mutation.users] }
    case 'add-user':
      return { ...state, users: [...state.users, mutation.user] }
    default:
      return state
  }
}