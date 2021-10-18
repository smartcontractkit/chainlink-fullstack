import { ChainId, Config, MULTICALL_ADDRESSES } from '@usedapp/core'
import LocalhostPriceConsumerV3 from '../artifacts/contracts/localhost/PriceConsumerV3.json'
import RinkebyPriceConsumerV3 from '../artifacts/contracts/rinkeby/PriceConsumerV3.json'
import KovanPriceConsumerV3 from '../artifacts/contracts/kovan/PriceConsumerV3.json'
import LocalhostRandomNumberConsumer from '../artifacts/contracts/localhost/RandomNumberConsumer.json'
import RinkebyRandomNumberConsumer from '../artifacts/contracts/rinkeby/RandomNumberConsumer.json'
import KovanRandomNumberConsumer from '../artifacts/contracts/kovan/RandomNumberConsumer.json'
import MulticallContract from '../artifacts/contracts/localhost/Multicall.json'
import LocalhostAPIConsumer from '../artifacts/contracts/localhost/APIConsumer.json'
import RinkebyAPIConsumer from '../artifacts/contracts/rinkeby/APIConsumer.json'
import KovanAPIConsumer from '../artifacts/contracts/kovan/APIConsumer.json'

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

const config: Config = {
  readOnlyChainId: ChainId.Kovan,
  readOnlyUrls: {
    [ChainId.Kovan]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  },
  supportedChains: [
    ChainId.Rinkeby,
    ChainId.Kovan,
    ChainId.Hardhat,
    ChainId.Localhost,
  ],
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    [ChainId.Hardhat]: MulticallContract.address,
    [ChainId.Localhost]: MulticallContract.address,
  },
}

export enum ContractId {
  PriceConsumer = 'priceConsumer',
  RandomNumberConsumer = 'randomNumberConsumer',
  ApiConsumer = 'apiConsumer',
}

type ContractDeployment = {
  address: string
  abi: any
}

type NetworkConfig = {
  [ContractId.PriceConsumer]: ContractDeployment
  [ContractId.RandomNumberConsumer]: ContractDeployment
  [ContractId.ApiConsumer]: ContractDeployment
}

export const contractConfig: Record<number, NetworkConfig> = {
  [ChainId.Localhost]: {
    [ContractId.PriceConsumer]: LocalhostPriceConsumerV3,
    [ContractId.RandomNumberConsumer]: LocalhostRandomNumberConsumer,
    [ContractId.ApiConsumer]: LocalhostAPIConsumer,
  },
  [ChainId.Rinkeby]: {
    [ContractId.PriceConsumer]: RinkebyPriceConsumerV3,
    [ContractId.RandomNumberConsumer]: RinkebyRandomNumberConsumer,
    [ContractId.ApiConsumer]: RinkebyAPIConsumer,
  },
  [ChainId.Kovan]: {
    [ContractId.PriceConsumer]: KovanPriceConsumerV3,
    [ContractId.RandomNumberConsumer]: KovanRandomNumberConsumer,
    [ContractId.ApiConsumer]: KovanAPIConsumer,
  },
}

export default config
