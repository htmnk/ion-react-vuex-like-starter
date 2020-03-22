import React, { createContext, useReducer } from 'react'
import { PostStore, PostState } from './structure/types'
import { postReducer } from './structure/reducer'
import { getters } from './structure/getters'
import { initActions } from './structure/actions'
import { AxiosError } from 'axios'

const initialStore: PostStore = {
  state: {
    isLoading: false,
    error: {} as AxiosError,
    posts: []
  } as PostState,
  getters: {
    postsReversed: []
  },
  mutations: {
    commit: () => {}
  },
  actions: {
    dispatch: () => {}
  }
}

export const PostContext = createContext<PostStore>(initialStore)

export const PostContextProvider: React.FC = (props) => {
  const [state, commit] = useReducer(postReducer, initialStore.state)
  const store: PostStore = {
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
    <PostContext.Provider value={store}>
      {props.children}
    </PostContext.Provider>
  )
}