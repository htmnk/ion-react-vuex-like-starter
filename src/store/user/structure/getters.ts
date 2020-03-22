import { UserState, UserGetters } from "./types"

export const getters = (state: Readonly<UserState>): UserGetters => {
  return {
    usersReversed: [...state.users].reverse()
  }
}