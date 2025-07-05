'use client'

import './globals.css'
import { ReactNode } from 'react'

import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { wagmiConfig } from '@/lib/wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
