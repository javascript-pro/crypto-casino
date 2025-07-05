# 🎰 Crypto Casino

A Web3-enabled demo app that simulates a provably fair dice game using smart contracts and modern frontend tools. Built with **Next.js (App Router)**, **wagmi**, **viem**, **RainbowKit**, and **Hardhat**.


## 🧱 Tech Stack

| Layer        | Tech Used                                      |
|--------------|------------------------------------------------|
| Frontend     | Next.js (App Router), Tailwind CSS, TypeScript |
| Wallet       | RainbowKit + wagmi + viem                      |
| Blockchain   | Local Ethereum blockchain (Hardhat)            |
| Smart Contract | Solidity (DiceGame.sol)                      |
| Dev Tools    | Ethers v6, Hardhat Toolbox, React Query        |


## 🚀 Features

- 🔐 Wallet connection with MetaMask / WalletConnect
- 🎲 Provably fair dice game using KECCAK-256 hash
- 📡 Smart contract interactions (commit + reveal)
- 🪄 Automatic UI updates from `Reveal` events
- 🧪 Fully functional local development with test accounts


## 🛠️ Getting Started

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


## 🔑 Wallet Setup (MetaMask)

1. Add a **Custom Network** in MetaMask:
   ```
   Name: Hardhat Localhost
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   ```

2. Import an account using one of the private keys shown by `npx hardhat node`


## 🧠 How the Game Works

1. **Generate a random seed** client-side
2. Compute the **KECCAK-256 hash** of the seed
3. Call `commit(hash)` on the contract
4. Later, call `reveal(seed)` to verify the hash
5. The contract emits a `Reveal` event with your dice roll result (1–6)

This pattern simulates **provably fair randomness**, where the seed is secret until revealed, but verifiable after the fact.


## 📁 Project Structure

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


## 📜 Smart Contract: `DiceGame.sol`

```solidity
function commit(bytes32 _commitment) external;
function reveal(string memory _seed) external;
event Reveal(address indexed player, uint8 roll, string seed);
```


## 📦 Commands Reference

| Command                         | Description                              |
|----------------------------------|------------------------------------------|
| `yarn dev`                      | Start the frontend                       |
| `npx hardhat node`              | Run local blockchain                     |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploy contract |


## 🧪 Next Steps

- [ ] Add loading/confirmation states
- [ ] Auto-reveal after delay
- [ ] Deploy to Sepolia
- [ ] Add unit tests for contract
- [ ] Add UI animation for dice roll


## 📄 License

MIT — for educational and demo purposes only.