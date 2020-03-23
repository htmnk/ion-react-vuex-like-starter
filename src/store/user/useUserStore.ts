import { useContext } from 'react'
import { UserContext } from './UserContext'

const useUserStore = () => {
  return useContext(UserContext)
}

export default useUserStore