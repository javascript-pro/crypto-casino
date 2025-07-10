'use client'

import { useState, useEffect, useRef } from 'react'
import {
  useAccount,
  useWriteContract,
  useWatchContractEvent,
} from 'wagmi'
import { keccak256, toBytes } from 'viem'
import { diceGameContract } from '@/lib/contracts'

import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material'

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

export default function DiceRoll() {
  const { address, isConnected } = useAccount()
  const [seed, setSeed] = useState('')
  const [hash, setHash] = useState('')
  const [committed, setCommitted] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [roll, setRoll] = useState<number | null>(null)
  const [log, setLog] = useState<string[]>([])
  const [rolling, setRolling] = useState(false)
  const [emoji, setEmoji] = useState('🎲')

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
    setLog([])
    setEmoji('🎲')
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
    startRolling()
  }

  const startRolling = () => {
    setRolling(true)
    intervalRef.current = setInterval(() => {
      const random = Math.floor(Math.random() * 6)
      setEmoji(diceFaces[random])
    }, 100)
  }

  const stopRolling = (finalRoll: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setEmoji(diceFaces[finalRoll - 1])
    setRolling(false)
  }

  // Watch Reveal event
  useWatchContractEvent({
    ...diceGameContract,
    eventName: 'Reveal',
    listener(logs) {
      const result = (logs[0] as any).args?.roll
      const value = Number(result)
      setRoll(value)
      appendLog(`🎉 Dice rolled: ${value}`)
      stopRolling(value)
    },
  })

  return (
    <Card variant="outlined">
      <CardHeader 
        avatar={"🎲"}
        title="Provably Fair Dice Game" 
        subheader="Honest, guv."  
      />
      <CardContent>
        <Stack spacing={3}>
          <Box display="flex" justifyContent="center" fontSize="4rem">
            {emoji}
          </Box>

          {!seed && (
            <Button variant="contained" onClick={generateSeed}>
              Generate Seed
            </Button>
          )}

          {seed && !committed && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommit}
              disabled={committing}
            >
              {committing ? 'Committing…' : 'Send Commit Transaction'}
            </Button>
          )}

          {committed && !revealed && (
            <Button
              variant="contained"
              color="success"
              onClick={handleReveal}
              disabled={revealing}
            >
              {revealing ? 'Revealing…' : 'Send Reveal Transaction'}
            </Button>
          )}

          {roll && !rolling && (
            <Typography variant="h6" color="secondary" textAlign="center">
              🎯 Final Result: {roll}
            </Typography>
          )}

          <Divider />

          {log.length > 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Log
              </Typography>
              <List dense>
                {log.map((line, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={line} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
