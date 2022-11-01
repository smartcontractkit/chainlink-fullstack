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

  if (chainId === '31337') {
    const LinkToken = await get('LinkToken')
    linkTokenAddress = LinkToken.address
    const VRFCoordinatorMock = await get('VRFCoordinatorMock')
    vrfCoordinatorAddress = VRFCoordinatorMock.address
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
    vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinatorV2 as string
  }
  const { keyHash, fee } = networkConfig[chainId]

  await deploy('RandomSVG', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true,
  })
}

func.tags = ['all', 'vrf', 'nft', 'main']

export default func
