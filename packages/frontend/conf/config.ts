import { ChainId, Config, Goerli, Mainnet, Hardhat } from '@usedapp/core'
import deployedContracts from '../contracts/hardhat_contracts.json'

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

const config: Config = {
  readOnlyChainId: ChainId.Goerli,
  readOnlyUrls: {
    [ChainId.Goerli]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [ChainId.Hardhat]: 'http://127.0.0.1:8545',
  },
  networks: [Goerli, Hardhat],
  multicallAddresses: {
    [ChainId.Hardhat]:
      deployedContracts[ChainId.Hardhat][0].contracts.Multicall.address,
    [ChainId.Mainnet]: Mainnet.multicallAddress,
  },
}

export const WbtcPorAddress = '0xa81FE04086865e63E12dD3776978E49DEEa2ea4e'

export const LinkTokenAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'

export enum Denominations {
  ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  BTC = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  USD = '0x0000000000000000000000000000000000000348',
}

export const OpenSeaUrl = 'https://testnets.opensea.io'
export const OpenSeaTestnet = ChainId.Goerli

export default config
