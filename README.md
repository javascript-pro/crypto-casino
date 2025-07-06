## Blockchain iGaming Experience

> What draws me to blockchain iGaming and Web3 is the combination of technical ambition and product focus — I like working in gaming, crypto, and DeFi, and solving real-world UX challenges at scale

I’m a Senior Fullstack JavaScript Dev, focused on building high-performing frontend applications using React and TypeScript. Most relevantly, I recently worked with a Maltese iGaming company — where I contributed to the development of a crypto casino platform.

That project had no fiat onramps, no KYC, and no banks — users could deposit and withdraw Bitcoin directly, and the games were provably fair.

I was brought on to help shape the frontend architecture, and we built everything from scratch — wallet integrations, animations, real-time UI updates, and a clean user experience tuned for conversion. It was a fast-paced environment, with a small team and a lot of freedom to make technical decisions.

Before that, I’ve worked across a range of industries — and led frontend teams, shipped PWAs, and built full platforms using modern CI/CD and containerized deployments. I’m especially interested in modular, composable frontend systems and collaborative product development.

## Crypto Casino Project – Technology Overview (Non-Technical)

This demo simulates a simple online dice game where users connect their cryptocurrency wallet, roll a dice, and see the result. Behind the scenes, it uses modern tools to ensure the game is **fair**, **secure**, and **transparent**.

## Website Frontend

### Next.js  
Modern framework for building fast and efficient websites. It powers the structure and navigation of our app.

### React  
Helps us build reusable UI components like buttons, forms, and displays.

### MUI (Material UI)  
A design system that provides clean, responsive UI elements like cards, buttons, and grids.

## Crypto Integration

### RainbowKit + WalletConnect  
Enables users to connect their cryptocurrency wallets (like MetaMask) to the app.

### wagmi  
A toolkit that makes it easy to send transactions and talk to the blockchain from our React app.

### viem  
Performs cryptographic operations like hashing, which we use to make the dice game provably fair.

## Provably Fair Dice Game

We ensure fairness through this process:

1. User generates a secret number (seed).
2. The app creates a hash of the seed and sends it to the blockchain.
3. Later, the seed is revealed and verified.
4. The result is calculated from the original seed.

This approach proves the result wasn’t tampered with — even by the developer.

## Smart Contracts

### Solidity  
The programming language used to write the blockchain-based game logic.

### Hardhat  
A tool that runs a local Ethereum blockchain on your computer. It’s perfect for testing contracts before going live.

## Development Tools

### TypeScript  
Adds better error checking to JavaScript. Helps developers catch mistakes early.

### Vercel  
Hosts the finished app so anyone can access it online. Fast and scalable.

## Technology Summary

| Area              | Technology                    | Purpose                                          |
|-------------------|-------------------------------|--------------------------------------------------|
| Website           | Next.js + React               | Build and organize the frontend interface        |
| Design            | MUI                           | Professional, responsive UI components           |
| Wallet Connect    | RainbowKit + WalletConnect    | Let users connect crypto wallets                 |
| Blockchain Access | wagmi + viem                  | Communicate securely with Ethereum               |
| Game Logic        | Solidity                      | Code the rules of the game on the blockchain     |
| Local Dev Chain   | Hardhat                       | Simulate blockchain for testing                  |
| Hosting           | Vercel                        | Make the app live on the internet                |

## Summary

Crypto Casino is a showcase of how modern web and blockchain tools can work together to create a fully transparent, user-controlled game. Every roll is verifiable, and every action is owned by the user.

A Web3-enabled demo app that simulates a provably fair dice game using smart contracts and modern frontend tools. Built with **Next.js (App Router)**, **wagmi**, **viem**, **RainbowKit**, and **Hardhat**.

## Tech Stack

| Layer          | Tech Used                                      |
|----------------|------------------------------------------------|
| Frontend       | Next.js (App Router), Tailwind CSS, TypeScript |
| Wallet         | RainbowKit + wagmi + viem                      |
| Blockchain     | Local Ethereum blockchain (Hardhat)            |
| Smart Contract | Solidity (DiceGame.sol)                        |
| Dev Tools      | Ethers v6, Hardhat Toolbox, React Query        |

## Features

- Wallet connection with MetaMask / WalletConnect
- Provably fair dice game using KECCAK-256 hash
- Smart contract interactions (commit + reveal)
- Automatic UI updates from `Reveal` events
- Fully functional local development with test accounts

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/javascript-pro/crypto-casino.git
cd crypto-casino
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Local Blockchain

```bash
npx hardhat node
```

This runs a local Ethereum network on `http://127.0.0.1:8545`.

### 4. Deploy the Smart Contract

In a second terminal tab:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the address printed in the output and paste it into:

```ts
// src/lib/contracts.ts
export const DICE_GAME_ADDRESS = '0x...'
```

### 5. Run the Frontend

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Wallet Setup (MetaMask)

1. Add a **Custom Network** in MetaMask:
   - Name: Hardhat Localhost  
   - RPC URL: `http://127.0.0.1:8545`  
   - Chain ID: `31337`

2. Import an account using one of the private keys shown by `npx hardhat node`.

## How the Game Works

1. Generate a random seed client-side.
2. Compute the KECCAK-256 hash of the seed.
3. Call `commit(hash)` on the contract.
4. Later, call `reveal(seed)` to verify the hash.
5. The contract emits a `Reveal` event with your dice roll result (1–6).

This pattern simulates **provably fair randomness**, where the seed is secret until revealed, but verifiable after the fact.

## Project Structure

```
contracts/
  DiceGame.sol          # Solidity smart contract
scripts/
  deploy.js             # Hardhat deploy script
src/
  app/                  # Next.js App Router entry
  components/           # UI components
  lib/
    wagmi.ts            # wagmi config with local chain
    contracts.ts        # Contract ABI + address
```

## Smart Contract: `DiceGame.sol`

```solidity
function commit(bytes32 _commitment) external;
function reveal(string memory _seed) external;
event Reveal(address indexed player, uint8 roll, string seed);
```

## Commands Reference

| Command                                                    | Description                  |
|-------------------------------------------------------------|------------------------------|
| `yarn dev`                                                 | Start the frontend           |
| `npx hardhat node`                                         | Run local blockchain         |
| `npx hardhat run scripts/deploy.js --network localhost`   | Deploy contract              |

## License

MIT — for educational and demo purposes only.
