import { Post } from "../../../../models/Post"
import { DispatchType } from '../../../../util/types'
import { setLoading, setPosts, setError, addPost } from '../mutations'
import { loadPosts } from '../actions'
import { AxiosError } from "axios"

export interface PostStore {
  state: Readonly<PostState>
  getters: PostGetters
  actions: {
    dispatch: React.Dispatch<PostActions>
  }
  mutations: {
    commit: React.Dispatch<PostMutations>
  }
}

export interface PostState {
  isLoading: boolean
  error: AxiosError
  posts: Post[]
}

export interface PostGetters {
  postsReversed: Post[]
} 

export type PostActions = 
  | DispatchType<typeof loadPosts>

export type PostMutations =
  | DispatchType<typeof setLoading>
  | DispatchType<typeof setError>
  | DispatchType<typeof setPosts>
  | DispatchType<typeof addPost>