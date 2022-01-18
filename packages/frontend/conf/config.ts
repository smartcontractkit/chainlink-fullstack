import { ChainId, Config, Rinkeby, Kovan, Localhost } from '@usedapp/core'
import Contracts from '../contracts/hardhat_contracts.json'

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

const localhostContracts = Contracts[Localhost.chainId].hardhat.contracts
const rinkebyContracts = Contracts[Rinkeby.chainId].rinkeby.contracts
const kovanContracts = Contracts[Kovan.chainId].kovan.contracts

const config: Config = {
  readOnlyChainId: ChainId.Kovan,
  readOnlyUrls: {
    [ChainId.Kovan]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  networks: [Rinkeby, Kovan, Localhost],
  multicallAddresses: {
    [ChainId.Localhost]: localhostContracts.Multicall.address,
  },
}

export enum ContractId {
  PriceConsumer = 'priceConsumer',
  PriceConsumerV3 = 'priceConsumerV3',
  RandomNumberConsumer = 'randomNumberConsumer',
  RandomSvg = 'randomSvg',
  APIRequestBuilder = 'apiRequestConsumer',
}

type ContractDeployment = {
  address: string
  abi: any
}

type NetworkConfig = {
  [ContractId.PriceConsumer]?: ContractDeployment
  [ContractId.PriceConsumerV3]?: ContractDeployment
  [ContractId.RandomNumberConsumer]?: ContractDeployment
  [ContractId.RandomSvg]?: ContractDeployment
  [ContractId.APIRequestBuilder]?: ContractDeployment
}

export const contractConfig: Record<number, NetworkConfig> = {
  [ChainId.Localhost]: {
    [ContractId.PriceConsumer]: localhostContracts.PriceConsumer,
    [ContractId.PriceConsumerV3]: localhostContracts.PriceConsumerV3,
    [ContractId.RandomNumberConsumer]: localhostContracts.RandomNumberConsumer,
    [ContractId.RandomSvg]: localhostContracts.RandomSVG,
    [ContractId.APIRequestBuilder]: localhostContracts.APIRequestBuilder,
  },
  [ChainId.Rinkeby]: {
    [ContractId.PriceConsumerV3]: rinkebyContracts.PriceConsumerV3,
    [ContractId.RandomNumberConsumer]: rinkebyContracts.RandomNumberConsumer,
    [ContractId.RandomSvg]: rinkebyContracts.RandomSVG,
    [ContractId.APIRequestBuilder]: rinkebyContracts.APIRequestBuilder,
  },
  [ChainId.Kovan]: {
    [ContractId.PriceConsumer]: kovanContracts.PriceConsumer,
    [ContractId.PriceConsumerV3]: kovanContracts.PriceConsumerV3,
    [ContractId.RandomNumberConsumer]: kovanContracts.RandomNumberConsumer,
    [ContractId.RandomSvg]: kovanContracts.RandomSVG,
    [ContractId.APIRequestBuilder]: kovanContracts.APIRequestBuilder,
  },
}

export const WbtcPorAddress = '0xa81FE04086865e63E12dD3776978E49DEEa2ea4e'

export const LinkTokenAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'

export enum Denominations {
  ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  BTC = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  USD = '0x0000000000000000000000000000000000000348',
}

export default config
