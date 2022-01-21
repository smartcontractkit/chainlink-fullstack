import React, { useState } from 'react'
import { Box, HStack, Select, Spinner, Text } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useEthers, ChainId } from '@usedapp/core'
import { useContractCall } from '../../hooks/useContractCall'
import { formatUsd } from '../../lib/utils'
import { Denominations, LinkTokenAddress } from '../../conf/config'
import { Error } from '../Error'

export function SelectFeed(): JSX.Element {
  const [base, setBase] = useState(LinkTokenAddress)

  const { chainId } = useEthers()

  const result = useContractCall<BigNumber>(
    'FeedRegistryConsumer',
    'getPrice',
    [base, Denominations.USD]
  )

  return (
    <>
      {chainId === ChainId.Rinkeby && (
        <Error message="Not available on this network. Please switch to Kovan." />
      )}
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
