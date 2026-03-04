import type { IAuthProvider } from '@likkida/shared'
import {
  useQuery,
} from '@tanstack/react-query'
import { AuthProviderAxios } from '../infra/providers/AuthProvider'
import { useUserStore } from '../stores/useUserStore'


const authProvider: IAuthProvider = new AuthProviderAxios()
const setUser = useUserStore.getState().setUser
export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth.me'],
    queryFn: authProvider.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
  setUser((user ?? null))
  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user
  }
}