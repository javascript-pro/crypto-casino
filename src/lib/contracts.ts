// src/lib/contracts.ts
import { abi } from '../../artifacts/contracts/DiceGame.sol/DiceGame.json'

export const DICE_GAME_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const diceGameContract = {
  address: DICE_GAME_ADDRESS as `0x${string}`,
  abi,
}
