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

  let ethUsdPriceFeedAddress: string
  if (chainId === '31337') {
    const EthUsdAggregator = await deployments.get('EthUsdAggregator')
    ethUsdPriceFeedAddress = EthUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed as string
  }

  await deploy('PriceConsumerV3', {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  })
}

func.tags = ['all', 'feed', 'main']

export default func
