'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box } from '@mui/material'

export default function ConnectWallet() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <ConnectButton showBalance={false} />
    </Box>
  )
}
