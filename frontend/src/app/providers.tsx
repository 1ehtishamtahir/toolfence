import { type ReactNode, useState } from "react"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  )
}