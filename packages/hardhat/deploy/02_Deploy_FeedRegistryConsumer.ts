import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { networkConfig } from '../helper-hardhat-config'

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  let feedRegistryAddress: string
  if (chainId === '31337') {
    const MockFeedRegistry = await deployments.get('MockFeedRegistry')
    feedRegistryAddress = MockFeedRegistry.address
  } else {
    feedRegistryAddress = networkConfig[chainId].feedRegistry as string
  }

  if (!feedRegistryAddress) return

  await deploy('FeedRegistryConsumer', {
    from: deployer,
    args: [feedRegistryAddress],
    log: true,
  })
}

func.tags = ['all', 'feed', 'main']

export default func
