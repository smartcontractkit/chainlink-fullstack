import {
  ChainId,
  Config,
  Rinkeby,
  Kovan,
  Localhost,
  Hardhat,
} from '@usedapp/core'
import LocalhostPriceConsumer from '../artifacts/contracts/localhost/PriceConsumer.json'
import KovanPriceConsumer from '../artifacts/contracts/kovan/PriceConsumer.json'
import LocalhostPriceConsumerV3 from '../artifacts/contracts/localhost/PriceConsumerV3.json'
import RinkebyPriceConsumerV3 from '../artifacts/contracts/rinkeby/PriceConsumerV3.json'
import KovanPriceConsumerV3 from '../artifacts/contracts/kovan/PriceConsumerV3.json'
import LocalhostRandomNumberConsumer from '../artifacts/contracts/localhost/RandomNumberConsumer.json'
import RinkebyRandomNumberConsumer from '../artifacts/contracts/rinkeby/RandomNumberConsumer.json'
import KovanRandomNumberConsumer from '../artifacts/contracts/kovan/RandomNumberConsumer.json'
import LocalhostRandomSVG from '../artifacts/contracts/localhost/RandomSVG.json'
import RinkebyRandomSVG from '../artifacts/contracts/rinkeby/RandomSVG.json'
import KovanRandomSVG from '../artifacts/contracts/kovan/RandomSVG.json'
import MulticallContract from '../artifacts/contracts/localhost/Multicall.json'
import LocalhostAPIConsumer from '../artifacts/contracts/localhost/APIConsumer.json'
import RinkebyAPIConsumer from '../artifacts/contracts/rinkeby/APIConsumer.json'
import KovanAPIConsumer from '../artifacts/contracts/kovan/APIConsumer.json'
import WbtcPorAggregator from '../artifacts/contracts/mainnet/WbtcPorAggregator.json'

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

const config: Config = {
  readOnlyChainId: ChainId.Kovan,
  readOnlyUrls: {
    [ChainId.Kovan]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  networks: [Rinkeby, Kovan, Hardhat, Localhost],
  multicallAddresses: {
    [ChainId.Hardhat]: MulticallContract.address,
    [ChainId.Localhost]: MulticallContract.address,
  },
}

export enum ContractId {
  PriceConsumer = 'priceConsumer',
  PriceConsumerV3 = 'priceConsumerV3',
  RandomNumberConsumer = 'randomNumberConsumer',
  RandomSvg = 'randomSvg',
  ApiConsumer = 'apiConsumer',
  WbtcPorAggregator = 'wbtcPorAggregator',
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
  [ContractId.ApiConsumer]?: ContractDeployment
  [ContractId.WbtcPorAggregator]?: ContractDeployment
}

export const contractConfig: Record<number, NetworkConfig> = {
  [ChainId.Localhost]: {
    [ContractId.PriceConsumer]: LocalhostPriceConsumer,
    [ContractId.PriceConsumerV3]: LocalhostPriceConsumerV3,
    [ContractId.RandomNumberConsumer]: LocalhostRandomNumberConsumer,
    [ContractId.RandomSvg]: LocalhostRandomSVG,
    [ContractId.ApiConsumer]: LocalhostAPIConsumer,
  },
  [ChainId.Rinkeby]: {
    [ContractId.PriceConsumerV3]: RinkebyPriceConsumerV3,
    [ContractId.RandomNumberConsumer]: RinkebyRandomNumberConsumer,
    [ContractId.RandomSvg]: RinkebyRandomSVG,
    [ContractId.ApiConsumer]: RinkebyAPIConsumer,
  },
  [ChainId.Kovan]: {
    [ContractId.PriceConsumer]: KovanPriceConsumer,
    [ContractId.PriceConsumerV3]: KovanPriceConsumerV3,
    [ContractId.RandomNumberConsumer]: KovanRandomNumberConsumer,
    [ContractId.RandomSvg]: KovanRandomSVG,
    [ContractId.ApiConsumer]: KovanAPIConsumer,
  },
  [ChainId.Mainnet]: {
    [ContractId.WbtcPorAggregator]: WbtcPorAggregator,
  },
}

export const LinkTokenAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'

export enum Denominations {
  ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  BTC = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  USD = '0x0000000000000000000000000000000000000348',
}

export default config
