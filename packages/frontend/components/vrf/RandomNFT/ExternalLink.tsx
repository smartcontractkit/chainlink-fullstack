import React from 'react'
import { Badge, HStack, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ChainId, useEthers } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { useContractConfig } from '../../../hooks/useContractConfig'

/**
 * Constants & Helpers
 */
const OPENSEA_URL = 'https://testnets.opensea.io'
const OPENSEA_TESTNET = ChainId.Rinkeby

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

  const contract = useContractConfig('RandomSVG')

  const active = chainId === OPENSEA_TESTNET

  const url = active && `${OPENSEA_URL}/assets/${contract.address}/${tokenId}`

  return (
    <HStack>
      <Link href={url} isExternal>
        See on OpenSea Testnet Marketplace <ExternalLinkIcon mx="2px" />
      </Link>
      {!active && <Badge>Rinkeby Only</Badge>}
    </HStack>
  )
}
