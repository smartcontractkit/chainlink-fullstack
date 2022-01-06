import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import { networkConfig } from '../helper-hardhat-config'
import { autoFundCheck } from '../utils'

const func: DeployFunction = async function ({
  deployments,
  getChainId,
  run,
}: HardhatRuntimeEnvironment) {
  const { get } = deployments
  const chainId = await getChainId()
  let linkTokenAddress: string

  if (chainId == '1337') {
    const linkToken = await get('LinkToken')
    linkTokenAddress = linkToken.address
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
  }

  // Try Auto-fund VRFConsumer contract
  const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
  const randomNumberConsumer = await ethers.getContractAt(
    'RandomNumberConsumer',
    RandomNumberConsumer.address
  )
  if (
    await autoFundCheck(randomNumberConsumer.address, chainId, linkTokenAddress)
  ) {
    await run('fund-link', {
      contract: randomNumberConsumer.address,
      linkaddress: linkTokenAddress,
    })
  }

  // Try Auto-fund RandomSVG contract
  const RandomSVG = await deployments.get('RandomSVG')
  const randomSVG = await ethers.getContractAt('RandomSVG', RandomSVG.address)
  if (await autoFundCheck(randomSVG.address, chainId, linkTokenAddress)) {
    await run('fund-link', {
      contract: randomSVG.address,
      linkaddress: linkTokenAddress,
    })
  }

  // Try Auto-fund APIConsumer contract with LINK
  const APIConsumer = await deployments.get('APIConsumer')
  const apiConsumer = await ethers.getContractAt(
    'APIConsumer',
    APIConsumer.address
  )
  if (await autoFundCheck(apiConsumer.address, chainId, linkTokenAddress)) {
    await run('fund-link', {
      contract: apiConsumer.address,
      linkaddress: linkTokenAddress,
    })
  }

  // Try Auto-fund APIRequestBuilder contract with LINK
  const APIRequestBuilder = await deployments.get('APIRequestBuilder')
  const apiRequestBuilder = await ethers.getContractAt(
    'APIRequestBuilder',
    APIRequestBuilder.address
  )
  if (
    await autoFundCheck(apiRequestBuilder.address, chainId, linkTokenAddress)
  ) {
    await run('fund-link', {
      contract: apiRequestBuilder.address,
      linkaddress: linkTokenAddress,
    })
  }
}

func.tags = ['all']

export default func
