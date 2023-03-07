import { BigNumber } from 'ethers'
import { networkConfig } from '../helper-hardhat-config'
import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'

task('fund-link', 'Transfer LINK tokens to a recipient')
  .addParam(
    'contract',
    'The address of the EOA or contract account that will receive your LINK tokens'
  )
  .addParam('amount', 'Amount in Juels. 1LINK=10**18 JUELS')
  .addOptionalParam('linkAddress', 'Set the LINK token address')
  .setAction(
    async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const { contract: recipientAddress, amount } = taskArgs
      const networkId = hre.network.config.chainId

      if (!networkId) return

      //Get signer information
      const accounts = await hre.ethers.getSigners()
      const signer = accounts[0]

      const linkTokenAddress =
        networkConfig[networkId]['linkToken'] || taskArgs.linkAddress
      const LinkToken = await hre.ethers.getContractFactory('LinkToken')
      const linkTokenContract = await LinkToken.attach(linkTokenAddress)

      const balance = await linkTokenContract.balanceOf(signer.address)
      console.log(
        `LINK balance of sender ${
          signer.address
        } is + ${hre.ethers.utils.formatEther(balance)}`
      )
      const amountBN = BigNumber.from(amount)
      if (balance.gte(amountBN)) {
        const result = await linkTokenContract.transfer(
          recipientAddress,
          amount
        )
        await result.wait()
        console.log(
          `${hre.ethers.utils.formatEther(
            amountBN
          )} LINK were sent from sender ${
            signer.address
          } to ${recipientAddress}.Transaction Hash: ${result.hash}`
        )
      } else {
        console.log(
          `Sender doesn't have enough LINK. Current balance is ${hre.ethers.utils.formatEther(
            balance
          )} LINK and transfer amount is ${hre.ethers.utils.formatEther(
            amount
          )} LINK`
        )
      }
    }
  )
