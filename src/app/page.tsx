// src/app/page.tsx
import ConnectWallet from '@/components/ConnectButton'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🎰 Crypto Casino</h1>
      <ConnectWallet />
    </main>
  )
}
