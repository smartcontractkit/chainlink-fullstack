import React from 'react'
import { Badge, HStack, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ChainId, useEthers } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { contractConfig } from '../../../conf/config'

/**
 * Constants & Helpers
 */
const OPENSEA_URL = 'https://testnets.opensea.io'
const OPENSEA_TESTNET = ChainId.Rinkeby

const getUrl = (id: BigNumber): string => {
  const { address } = contractConfig[OPENSEA_TESTNET].randomSvg
  return `${OPENSEA_URL}/assets/${address}/${id}`
}

/**
 * Prop Types
 */
export interface Props {
  tokenId: BigNumber
}

/**
 * Component
 */
export function ExternalLink({ tokenId }: Props): JSX.Element {
  const { chainId } = useEthers()

  const active = chainId === OPENSEA_TESTNET

  return (
    <HStack>
      <Link href={active && getUrl(tokenId)} isExternal>
        See on OpenSea Testnet Marketplace <ExternalLinkIcon mx="2px" />
      </Link>
      {!active && <Badge>Rinkeby Only</Badge>}
    </HStack>
  )
}
