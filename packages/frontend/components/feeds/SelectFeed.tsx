import React, { useState } from 'react'
import { Box, HStack, Select, Spinner, Text } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useContractCall } from '../../hooks/useContractCall'
import { formatUsd } from '../../lib/utils'
import { Denominations, LinkTokenAddress } from '../../conf/config'

export function SelectFeed(): JSX.Element {
  const [base, setBase] = useState(LinkTokenAddress)

  const result = useContractCall<BigNumber>(
    'FeedRegistryConsumer',
    'getPrice',
    [base, Denominations.USD]
  )

  return (
    <>
      <HStack>
        <Box>
          <Select
            value={base}
            onChange={(event) => setBase(event.target.value)}
          >
            <option value={LinkTokenAddress}>LINK</option>
            <option value={Denominations.ETH}>ETH</option>
            <option value={Denominations.BTC}>BTC</option>
          </Select>
        </Box>
        <Text fontSize="xl">/ USD:</Text>
        {!result && <Spinner color="teal" />}
        {result && <Text fontSize="xl">{formatUsd(result)}</Text>}
      </HStack>
    </>
  )
}
