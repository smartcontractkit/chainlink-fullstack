import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { networkConfig } from '../helper-hardhat-config'

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress: string
  let vrfCoordinatorAddress: string
  let vrfSubscriptionId: string
  let vrfGasLane: string
  let vrfCallbackGasLimit: string

  if (chainId === '31337') {
    const LinkToken = await get('LinkToken')
    linkTokenAddress = LinkToken.address
    const VRFCoordinatorMockV2 = await get('VRFCoordinatorMockV2')
    vrfCoordinatorAddress = VRFCoordinatorMockV2.address
    vrfSubscriptionId = "1234"
    vrfGasLane = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15"
    vrfCallbackGasLimit = "5000"
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
    vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinatorV2 as string
    vrfSubscriptionId = networkConfig[chainId].vrfSubscriptionId as string
    vrfGasLane = networkConfig[chainId].vrfGasLane as string
    vrfCallbackGasLimit = networkConfig[chainId].vrfCallbackGasLimit as string
  }

  await deploy('RandomSVGV2', {
    from: deployer,
    args: [vrfCoordinatorAddress, vrfSubscriptionId, vrfGasLane, vrfCallbackGasLimit],
    log: true,
  })
}

func.tags = ['all', 'vrf', 'nft', 'main']

export default func
