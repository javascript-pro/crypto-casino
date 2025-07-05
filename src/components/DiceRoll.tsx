'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi'
import { keccak256, toBytes } from 'viem'
import { diceGameContract } from '@/lib/contracts'

export default function DiceRoll() {
  const { address, isConnected } = useAccount()
  const [seed, setSeed] = useState('')
  const [hash, setHash] = useState('')
  const [committed, setCommitted] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [roll, setRoll] = useState<number | null>(null)
  const [log, setLog] = useState<string[]>([])

  const appendLog = (line: string) => setLog((prev) => [...prev, line])

  const { writeContract: commitWrite, isPending: committing } = useWriteContract()
  const { writeContract: revealWrite, isPending: revealing } = useWriteContract()

  const generateSeed = () => {
    const s = Math.random().toString(36).substring(2)
    const h = keccak256(toBytes(s))
    setSeed(s)
    setHash(h)
    setRoll(null)
    setCommitted(false)
    setRevealed(false)
    appendLog(`🔐 Seed generated: ${s}`)
    appendLog(`📦 Hash: ${h}`)
  }

  const handleCommit = () => {
    if (!hash) return
    commitWrite({
      ...diceGameContract,
      functionName: 'commit',
      args: [hash],
    })
    setCommitted(true)
    appendLog('✅ Commit transaction sent.')
  }

  const handleReveal = () => {
    if (!seed) return
    revealWrite({
      ...diceGameContract,
      functionName: 'reveal',
      args: [seed],
    })
    setRevealed(true)
    appendLog('🔍 Reveal transaction sent.')
  }

  // Listen for the Reveal event
  useWatchContractEvent({
    ...diceGameContract,
    eventName: 'Reveal',
    listener(logs) {
      const result = (logs[0] as any).args?.roll
      setRoll(Number(result))
      appendLog(`🎉 Dice rolled: ${result}`)
    },
  })

  return (
    <div className="mt-8 p-4 border rounded max-w-md space-y-4">
      <h2 className="text-xl font-bold">🎲 Provably Fair Dice Game</h2>

      {!seed && (
        <button
          onClick={generateSeed}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Generate Seed
        </button>
      )}

      {seed && !committed && (
        <button
          onClick={handleCommit}
          disabled={committing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {committing ? 'Committing…' : 'Send Commit Transaction'}
        </button>
      )}

      {committed && !revealed && (
        <button
          onClick={handleReveal}
          disabled={revealing}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {revealing ? 'Revealing…' : 'Send Reveal Transaction'}
        </button>
      )}

      {roll && (
        <div className="text-lg font-semibold">🎯 Final Result: {roll}</div>
      )}

      <div className="mt-4 text-sm text-gray-700">
        <h3 className="font-semibold mb-1">Log:</h3>
        <ul className="list-disc list-inside space-y-1">
          {log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
