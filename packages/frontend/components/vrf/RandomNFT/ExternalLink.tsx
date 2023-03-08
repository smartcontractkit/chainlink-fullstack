import React from 'react'
import { Badge, HStack, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ChainId, useEthers } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { useContractConfig } from '../../../hooks/useContractConfig'
import { OpenSeaUrl } from '../../../conf/config'

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

  const active = chainId === ChainId.Goerli

  const url = active
    ? `${OpenSeaUrl}/assets/${contract.address}/${tokenId}`
    : undefined

  return (
    <HStack>
      <Link href={url} isExternal>
        See on OpenSea Testnet Marketplace <ExternalLinkIcon mx="2px" />
      </Link>
      {!active && <Badge>Goerli only</Badge>}
    </HStack>
  )
}
