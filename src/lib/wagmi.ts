import { http, createConfig } from 'wagmi'
import { Chain } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export const localhost = {
  id: 31337,
  name: 'Hardhat Local',
  network: 'localhost',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
} as const satisfies Chain

export const wagmiConfig = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
  ssr: true,
})
