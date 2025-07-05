// scripts/deploy.js
const hre = require("hardhat")

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  console.log("Deploying contract with:", deployer.address)

  const DiceGame = await hre.ethers.getContractFactory("DiceGame")
  const diceGame = await DiceGame.deploy()

  await diceGame.waitForDeployment()

  const address = await diceGame.getAddress()
  console.log("DiceGame deployed to:", address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
