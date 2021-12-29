import { BigNumber, ContractTransaction } from 'ethers'
import { task } from 'hardhat/config'
import { networkConfig } from '../helper-hardhat-config'

task('withdraw-link', 'Returns any LINK left in deployed contract')
  .addParam('contract', 'The address of the contract')
  .addOptionalParam('linkaddress', 'Set the LINK token address')
  .setAction(async (taskArgs, hre) => {
    const contractAddr: string = taskArgs.contract
    const chainId = await hre.getChainId()

    //Get signer information
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]

    //First, lets see if there is any LINK to withdraw
    const linkTokenAddress: string =
      networkConfig[chainId]['linkToken'] || taskArgs.linkaddress
    const LinkToken = await hre.ethers.getContractFactory('LinkToken')
    const linkTokenContract = new hre.ethers.Contract(
      linkTokenAddress,
      LinkToken.interface,
      signer
    )
    const balance: BigNumber = await linkTokenContract.balanceOf(contractAddr)
    console.log(
      'LINK balance of contract: ' +
        contractAddr +
        ' is ' +
        hre.ethers.utils.formatEther(balance)
    )

    if (balance.gt(hre.ethers.BigNumber.from(0))) {
      //Could also be Any-API contract, but in either case the function signature is the same, so we just need to use one
      const RandomNumberConsumer = await hre.ethers.getContractFactory(
        'RandomNumberConsumer'
      )

      //Create connection to Consumer Contract and call the withdraw function
      const ConsumerContract = new hre.ethers.Contract(
        contractAddr,
        RandomNumberConsumer.interface,
        signer
      )
      const result: ContractTransaction = await ConsumerContract.withdrawLink()
      console.log(
        'All LINK withdrew from contract ' + contractAddr,
        '. Transaction Hash: ',
        result.hash
      )
    } else {
      console.log("Contract doesn't have any LINK to withdraw")
    }
  })
