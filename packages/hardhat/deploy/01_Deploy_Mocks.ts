import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const DECIMALS = '8'
  const INITIAL_PRICE = '20000000000'

  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  if (chainId === '31337') {
    await deploy('MockFeedRegistry', {
      from: deployer,
      log: true,
    })
    await deploy('EthUsdAggregator', {
      contract: 'MockV3Aggregator',
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })
    const linkToken = await deploy('LinkToken', { from: deployer, log: true })
    await deploy('VRFCoordinatorMock', {
      from: deployer,
      log: true,
      args: [linkToken.address],
    })
    await deploy('VRFCoordinatorMockV2', {
      from: deployer,
      log: true,
      args: [],
    })
    await deploy('MockOracle', {
      from: deployer,
      log: true,
      args: [linkToken.address],
    })
  }
}

func.tags = ['all', 'mocks', 'main']

export default func
