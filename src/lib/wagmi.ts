// src/lib/wagmi.ts
'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'Crypto Casino',
  projectId: 'cd11547ef620c5f14df9e61556b1428f',
  chains: [sepolia],
  ssr: true,
})
