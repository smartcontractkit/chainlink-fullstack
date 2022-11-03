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
  let wrapperAddress: string

  if (chainId === '31337') {
    const LinkToken = await get('LinkToken')
    linkTokenAddress = LinkToken.address
    const VRFV2Wrapper = await get('VRFV2Wrapper')
    wrapperAddress = VRFV2Wrapper.address
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string
    wrapperAddress = networkConfig[chainId].wrapperAddress as string
  }
  const { vrfCallbackGasLimit } = networkConfig[chainId]

  await deploy('RandomNumberConsumer', {
    from: deployer,
    args: [
      wrapperAddress,
      linkTokenAddress,
      vrfCallbackGasLimit?.randomNumberConsumer,
    ],
    log: true,
  })
}

func.tags = ['all', 'vrf', 'main']

export default func
