// src/lib/contracts.ts
import { abi } from '../../artifacts/contracts/DiceGame.sol/DiceGame.json'

export const DICE_GAME_ADDRESS = '0xYOUR_LOCAL_ADDRESS_HERE'

export const diceGameContract = {
  address: DICE_GAME_ADDRESS as `0x${string}`,
  abi,
}
