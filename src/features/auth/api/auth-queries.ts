import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import type { ApiError } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { queryClient } from '@/shared/lib/query-client'
import { tokenStorage } from '@/shared/lib/token-storage'
import { useAuthStore } from '../model/auth-store'
import type { LoginValues } from '../model/schemas'
import { authApi } from './auth-api'

export const authKeys = {
  me: ['auth', 'me'] as const,
}

export function useSession() {
  const setUser = useAuthStore((state) => state.setUser)
  const setReady = useAuthStore((state) => state.setReady)

  return useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      const user = await authApi.me()
      setUser(user)
      setReady(true)
      return user
    },
    enabled: Boolean(tokenStorage.get()),
    retry: false,
    staleTime: Infinity,
  })
}

export function useLogin() {
  const navigate = useNavigate()
  const signIn = useAuthStore((state) => state.signIn)

  return useMutation({
    mutationFn: (values: LoginValues) => authApi.login(values),
    onSuccess: (result) => {
      signIn(result.accessToken, result.user)
      toast.success(`Xush kelibsiz, ${result.user.fullname}`)
      navigate(ROUTES.dashboard, { replace: true })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const signOut = useAuthStore((state) => state.signOut)

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      signOut()
      queryClient.clear()
      navigate(ROUTES.login, { replace: true })
    },
  })
}
