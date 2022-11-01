import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { BigNumber } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'
import { VRFV2Wrapper } from 'types/typechain'
import { ethers } from 'hardhat'

async function configureWrapper(wrapperAddress: string) {
  //using same wrapper config as in ChainLink's tests - https://github.com/smartcontractkit/chainlink/blob/develop/contracts/test/v0.8/dev/VRFV2Wrapper.test.ts
  const WRAPPER_GAS_OVERHEAD = BigNumber.from(60000)
  const COORDINATOR_GAS_OVERHEAD = BigNumber.from(52000)
  const WRAPPER_PREMIUM_PERCENTAGE = 10
  const MAX_NUM_WORDS = 5

  let wrapper = (await ethers.getContractAt(
    'VRFV2Wrapper',
    wrapperAddress
  )) as VRFV2Wrapper

  await wrapper.setConfig(
    WRAPPER_GAS_OVERHEAD,
    COORDINATOR_GAS_OVERHEAD,
    WRAPPER_PREMIUM_PERCENTAGE,
    formatBytes32String('keyHash'),
    MAX_NUM_WORDS
  )
}

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  // using initial settings like the ones used in ChainLink's tests - https://github.com/smartcontractkit/chainlink/blob/develop/contracts/test/v0.8/dev/VRFV2Wrapper.test.ts
  const DECIMALS = '18'
  const INITIAL_PRICE = BigNumber.from('3000000000000000')

  /**
   * @dev Read more at https://docs.chain.link/docs/chainlink-vrf/
   */
  const BASE_FEE = '100000000000000000'
  const GAS_PRICE_LINK = '1000000000' // 0.000000001 LINK per gas

  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  if (chainId === '31337') {
    await deploy('MockFeedRegistry', {
      from: deployer,
      log: true,
    })
    const aggregator = await deploy('EthUsdAggregator', {
      contract: 'MockV3Aggregator',
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })
    const linkToken = await deploy('LinkToken', { from: deployer, log: true })
    const coordinator = await deploy('VRFCoordinatorV2Mock', {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    })

    let vrfV2WrapperDeployTx = await deploy('VRFV2Wrapper', {
      from: deployer,
      log: true,
      args: [linkToken.address, aggregator.address, coordinator.address],
    })
    await configureWrapper(vrfV2WrapperDeployTx.address)

    await deploy('MockOracle', {
      from: deployer,
      log: true,
      args: [linkToken.address],
    })
  }
}

func.tags = ['all', 'mocks', 'main']

export default func
