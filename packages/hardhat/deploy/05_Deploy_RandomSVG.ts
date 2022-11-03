import { ethers } from 'hardhat'
import { networkConfig } from '../helper-hardhat-config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction, DeploymentsExtension } from 'hardhat-deploy/types'
import { VRFCoordinatorV2Mock } from 'types/typechain'

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  if (chainId === '31337') {
    await deployToLocalNetwork(deployments, deployer, chainId)
  } else {
    await deployToPublicNetwork(deployments, deployer, chainId)
  }
}

async function deployToLocalNetwork(
  deployments: DeploymentsExtension,
  deployer: string,
  chainId: string
) {
  const { deploy, get } = deployments
  const { vrfGasLane, vrfCallbackGasLimit } = networkConfig[chainId]

  const VRFCoordinatorMockV2 = await get('VRFCoordinatorV2Mock')
  const vrfCoordinatorV2Mock = (await ethers.getContractAt(
    'VRFCoordinatorV2Mock',
    VRFCoordinatorMockV2.address
  )) as VRFCoordinatorV2Mock

  const vrfCoordinatorV2 = vrfCoordinatorV2Mock.address
  const vrfSubscriptionId = await createMockSubscription(
    vrfCoordinatorV2Mock,
    chainId
  )

  await deploy('RandomSVG', {
    from: deployer,
    args: [
      vrfCoordinatorV2,
      vrfSubscriptionId,
      vrfGasLane,
      vrfCallbackGasLimit?.randomSVG,
    ],
    log: true,
  })

  const RandomSVG = await get('RandomSVG')

  const consumerIsAdded = await vrfCoordinatorV2Mock.consumerIsAdded(
    vrfSubscriptionId,
    RandomSVG.address
  )
  if (!consumerIsAdded) {
    await vrfCoordinatorV2Mock?.addConsumer(
      vrfSubscriptionId,
      RandomSVG.address
    )
  }
}

async function deployToPublicNetwork(
  deployments: DeploymentsExtension,
  deployer: string,
  chainId: string
) {
  const { deploy } = deployments
  const {
    vrfCoordinatorV2,
    vrfSubscriptionId,
    vrfGasLane,
    vrfCallbackGasLimit,
  } = networkConfig[chainId]

  await deploy('RandomSVG', {
    from: deployer,
    args: [
      vrfCoordinatorV2,
      vrfSubscriptionId,
      vrfGasLane,
      vrfCallbackGasLimit?.randomSVG,
    ],
    log: true,
  })
}

async function createMockSubscription(
  vrfCoordinatorV2Mock: VRFCoordinatorV2Mock,
  chainId: string
): Promise<string> {
  const { fundAmount } = networkConfig[chainId]

  const transaction = await vrfCoordinatorV2Mock.createSubscription()
  const transactionReceipt = await transaction.wait()
  const vrfSubscriptionId = ethers.BigNumber.from(
    transactionReceipt!.events![0].topics[1]
  ).toString()

  await vrfCoordinatorV2Mock.fundSubscription(vrfSubscriptionId, fundAmount)

  return vrfSubscriptionId
}

func.tags = ['all', 'vrf', 'nft', 'main']

export default func
