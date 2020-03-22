import { User } from "../../../../models/User";
import { DispatchType } from '../../../../util/types'
import { setLoading, setUsers, setError, addUser } from '../mutations'
import { loadUsers } from '../actions'
import { AxiosError } from "axios";

export interface UserStore {
  state: Readonly<UserState>
  getters: UserGetters
  actions: {
    dispatch: React.Dispatch<UserActions>
  }
  mutations: {
    commit: React.Dispatch<UserMutations>
  }
}

export interface UserState {
  isLoading: boolean
  error: AxiosError
  users: User[]
}

export interface UserGetters {
  usersReversed: User[]
} 

export type UserActions = 
  | DispatchType<typeof loadUsers>

export type UserMutations =
  | DispatchType<typeof setLoading>
  | DispatchType<typeof setError>
  | DispatchType<typeof setUsers>
  | DispatchType<typeof addUser>
