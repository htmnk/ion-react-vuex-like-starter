import { PostMutations, PostActions } from "./types"
import axios, { AxiosResponse } from 'axios'
import { GET_POSTS_URL, Post } from "../../../models/Post"
import { API_BASE_URL } from "../../../util/utils"

export const loadPosts = () => ({
  type: 'load-posts'
} as const);

export const initActions = (commit: React.Dispatch<PostMutations>) => {
  const dispatch: React.Dispatch<PostActions> = async (action) => {
    switch (action.type) {
      case 'load-posts':
        try {
          commit({ type: 'set-loading', isLoading: true })
          const res: AxiosResponse<Post[]> = await axios.get(`${API_BASE_URL}${GET_POSTS_URL}`)

          if (res.status === 200) {
            const posts: Post[] = res.data.map((apiPost) => ({
              id: apiPost.id,
              userId: apiPost.userId,
              title: apiPost.title
            }))

            commit({ type: 'set-posts', posts })
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