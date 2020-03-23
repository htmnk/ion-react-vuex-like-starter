import { useContext } from 'react'
import { PostContext } from './PostContext'

const usePostStore = () => {
  return useContext(PostContext)
}

export default usePostStore