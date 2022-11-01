import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { networkConfig } from '../helper-hardhat-config'
import { ethers } from 'hardhat'
import { VRFCoordinatorV2Mock } from 'types/typechain'
import {
  Deployment,
  DeployOptions,
  DeployResult,
} from 'hardhat-deploy/dist/types'

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  if (chainId === '31337') {
    await deployToLocalNetwork(deploy, get, deployer)
  } else {
    await deployToPublicNetwork(deploy, deployer, chainId)
  }
}

async function deployToLocalNetwork(
  deploy: (name: string, option: DeployOptions) => Promise<DeployResult>,
  get: (name: string) => Promise<Deployment>,
  deployer: string
) {
  let { vrfGasLane, vrfCallbackGasLimit } = networkConfig[31337]

  const VRFCoordinatorMockV2 = await get('VRFCoordinatorV2Mock')
  let vrfCoordinatorV2Mock = (await ethers.getContractAt(
    'VRFCoordinatorV2Mock',
    VRFCoordinatorMockV2.address
  )) as VRFCoordinatorV2Mock

  let vrfCoordinatorV2 = vrfCoordinatorV2Mock.address
  let vrfSubscriptionId = await createMockSubscription(vrfCoordinatorV2Mock)

  await deploy('RandomSVG', {
    from: deployer,
    args: [
      vrfCoordinatorV2,
      vrfSubscriptionId,
      vrfGasLane,
      vrfCallbackGasLimit?.RandomSVG,
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
  deploy: (name: string, option: DeployOptions) => Promise<DeployResult>,
  deployer: string,
  chainId: string
) {
  let { vrfCoordinatorV2, vrfSubscriptionId, vrfGasLane, vrfCallbackGasLimit } =
    networkConfig[chainId]

  await deploy('RandomSVG', {
    from: deployer,
    args: [
      vrfCoordinatorV2,
      vrfSubscriptionId,
      vrfGasLane,
      vrfCallbackGasLimit?.RandomSVG,
    ],
    log: true,
  })
}

async function createMockSubscription(
  vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
): Promise<string> {
  const fundAmount = networkConfig[31337]['fundAmount']
  const transaction = await vrfCoordinatorV2Mock.createSubscription()
  const transactionReceipt = await transaction.wait(1)
  let vrfSubscriptionId = ethers.BigNumber.from(
    transactionReceipt!.events![0].topics[1]
  ).toString()
  await vrfCoordinatorV2Mock.fundSubscription(vrfSubscriptionId, fundAmount)

  return vrfSubscriptionId
}

func.tags = ['all', 'vrf', 'nft', 'main']

export default func
