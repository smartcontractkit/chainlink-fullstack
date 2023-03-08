import {
  ChainId,
  Config,
  Sepolia,
  Goerli,
  Mainnet,
  Hardhat,
} from '@usedapp/core'
import deployedContracts from '../contracts/hardhat_contracts.json'

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

const config: Config = {
  readOnlyChainId: ChainId.Sepolia,
  readOnlyUrls: {
    [ChainId.Goerli]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Sepolia]: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Hardhat]: 'http://127.0.0.1:8545',
  },
  networks: [Sepolia, Goerli, Hardhat],
  multicallAddresses: {
    [ChainId.Hardhat]:
      deployedContracts[ChainId.Hardhat][0].contracts.Multicall.address,
    [ChainId.Mainnet]: Mainnet.multicallAddress,
  },
}

export const WbtcPorAddress = '0xa81FE04086865e63E12dD3776978E49DEEa2ea4e'

export const FeedRegistryAddress = '0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf'

export const LinkTokenAddress = '0x514910771AF9Ca656af840dff83E8264EcF986CA'

export enum Denominations {
  ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  BTC = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  USD = '0x0000000000000000000000000000000000000348',
}

export const OpenSeaUrl = 'https://testnets.opensea.io'

export default config
