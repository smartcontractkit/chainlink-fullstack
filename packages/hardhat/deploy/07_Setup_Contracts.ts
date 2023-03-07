import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import { networkConfig } from '../helper-hardhat-config'
import { autoFundCheck } from '../utils'
import { LinkToken } from 'types/typechain'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { get } = deployments
  const chainId = await getChainId()
  let linkToken: LinkToken
  let linkTokenAddress: string
  const fundAmount = networkConfig[chainId]['fundAmount']

  if (chainId == '31337') {
    linkTokenAddress = (await get('LinkToken')).address
    linkToken = (await ethers.getContractAt(
      'LinkToken',
      linkTokenAddress
    )) as LinkToken
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
    linkToken = (await ethers.getContractAt(
      'LinkToken',
      linkTokenAddress
    )) as LinkToken
  }

  // Try Auto-fund RandomNumberConsumer contract
  const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
  const randomNumberConsumer = await ethers.getContractAt(
    'RandomNumberConsumer',
    RandomNumberConsumer.address
  )
  if (
    await autoFundCheck(randomNumberConsumer.address, chainId, linkTokenAddress)
  ) {
    await linkToken.transfer(randomNumberConsumer.address, fundAmount)
  }

  // Fund RandomSVG instructions
  if (chainId !== '31337') {
    console.log(
      `Please add RandomSVG address in your prefunded Chainlink VRF sucscription at https://vrf.chain.link`
    )
  }

  // Try Auto-fund APIConsumer contract with LINK
  const APIConsumer = await deployments.get('APIConsumer')
  const apiConsumer = await ethers.getContractAt(
    'APIConsumer',
    APIConsumer.address
  )
  if (await autoFundCheck(apiConsumer.address, chainId, linkTokenAddress)) {
    await linkToken.transfer(apiConsumer.address, fundAmount)
  }
}

func.tags = ['all']

export default func
