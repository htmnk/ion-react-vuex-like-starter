import { PostState, PostGetters } from "./types"

export const getters = (state: Readonly<PostState>): PostGetters => {
  return {
    postsReversed: [...state.posts].reverse()
  }
}