import type { User } from '@/entities/user'
import { createContext } from 'react'

export interface AuthContextType {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>({
  user: null,
  loading: true,
})
