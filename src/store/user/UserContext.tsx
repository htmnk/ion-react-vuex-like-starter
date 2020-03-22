import React, { createContext, useReducer } from 'react'
import { UserStore, UserState } from './structure/types'
import { userReducer } from './structure/reducer'
import { getters } from './structure/getters'
import { initActions } from './structure/actions'
import { AxiosError } from 'axios'

const initialStore: UserStore = {
  state: {
    isLoading: false,
    error: {} as AxiosError,
    users: []
  } as UserState,
  getters: {
    usersReversed: []
  },
  mutations: {
    commit: () => {}
  },
  actions: {
    dispatch: () => {}
  }
}

export const UserContext = createContext<UserStore>(initialStore)

export const UserContextProvider: React.FC = (props) => {
  const [state, commit] = useReducer(userReducer, initialStore.state)
  const store: UserStore = {
    state,
    getters: getters(state),
    actions: {
      dispatch: initActions(commit)
    },
    mutations: {
      commit
    }
  }

  return (
    <UserContext.Provider value={store}>
      {props.children}
    </UserContext.Provider>
  )
}