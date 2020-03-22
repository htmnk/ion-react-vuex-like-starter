import { Post } from '../../../models/Post'
import { AxiosError } from 'axios'
    
export const setLoading = (isLoading: boolean) => ({
  type: 'set-loading',
  isLoading
} as const);
    
export const setError = (error: AxiosError) => ({
  type: 'set-error',
  error
} as const)
    
export const setPosts = (posts: Post[]) => ({
  type: 'set-posts',
  posts
} as const);
    
export const addPost = (post: Post) => ({
  type: 'add-post',
  post
} as const);