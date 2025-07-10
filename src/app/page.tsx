import ConnectWallet from '@/components/ConnectButton'
import DiceRoll from '@/components/DiceRoll'
import { Container, Typography, Card, CardHeader,  } from '@mui/material'

export default function Home() {
  return (
    <main>
      <Container maxWidth="sm" sx={{mt: 4}}>
        <CardHeader 
          title="Crypto Casino"
        />
        <ConnectWallet />
        <DiceRoll />
      </Container>
    </main>
  )
}
