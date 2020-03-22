import { PostState } from './types'
import { PostMutations } from './types'    

export function postReducer(state: PostState, mutation: PostMutations): PostState {
  switch (mutation.type) {
    case 'set-loading':
      return { ...state, isLoading: mutation.isLoading }
    case 'set-error':
      return { ...state, error: mutation.error }
    case 'set-posts':
      return { ...state, posts: [...state.posts, ...mutation.posts] }
    case 'add-post':
      return { ...state, posts: [...state.posts, mutation.post] }
    default:
      return state
  }
}