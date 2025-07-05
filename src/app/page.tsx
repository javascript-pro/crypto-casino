import ConnectWallet from '@/components/ConnectButton'
import DiceRoll from '@/components/DiceRoll'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🎰 Crypto Casino</h1>
      <ConnectWallet />
      <DiceRoll />
    </main>
  )
}
