import React from 'react'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useContractCall } from '../../hooks/useContractCall'
import { formatUsd } from '../../lib/utils'

export function PriceFeed(): JSX.Element {
  const result = useContractCall<BigNumber>('PriceConsumerV3', 'getLatestPrice')

  return (
    <HStack>
      <Text fontSize="xl">ETH/USD:</Text>
      {!result && <Spinner color="teal" />}
      {result && <Text fontSize="xl">{formatUsd(result)}</Text>}
    </HStack>
  )
}
