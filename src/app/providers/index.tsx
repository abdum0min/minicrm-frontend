import type { PropsWithChildren } from 'react'

import { QueryProvider } from './query-provider'
import { RouterProvider } from './router-provider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <RouterProvider>{children}</RouterProvider>
    </QueryProvider>
  )
}
