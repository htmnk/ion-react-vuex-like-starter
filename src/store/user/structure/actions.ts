import { UserMutations, UserActions } from "./types";
import axios, { AxiosResponse } from 'axios';
import { GET_USERS_URL, User } from "../../../models/User";
import { API_BASE_URL } from "../../../util/utils";

export const loadUsers = () => ({
  type: 'load-users'
} as const);

export const initActions = (commit: React.Dispatch<UserMutations>) => {
  const dispatch: React.Dispatch<UserActions> = async (action) => {
    switch (action.type) {
      case 'load-users':
        try {
          commit({ type: 'set-loading', isLoading: true })
          const res: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}${GET_USERS_URL}`)

          if (res.status === 200) {
            const users: User[] = res.data.map((apiUser) => ({
              id: apiUser.id,
              username: apiUser.username,
              website: apiUser.website
            }))

            commit({ type: 'set-users', users })
          }
        } catch (error) {
          commit({ type: 'set-error', error })
        } finally {
          commit({ type: 'set-loading', isLoading: false })
        }
        break;
        
      default:
        break;
    }
  }

  return dispatch
}