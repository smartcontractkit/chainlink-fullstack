import React, { useState } from 'react'
import {
  Box,
  HStack,
  Select,
  Spinner,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useEthers, ChainId } from '@usedapp/core'
import { useContractCall } from '../../hooks/useContractCall'
import { formatUsd } from '../../lib/utils'
import { ContractId, Denominations, LinkTokenAddress } from '../../conf/config'


export function SelectFeed(): JSX.Element {
  const [base, setBase] = useState(LinkTokenAddress)
  const { chainId } = useEthers()

  const result = useContractCall<BigNumber>(
    ContractId.PriceConsumer,
    'getPrice',
    [base, Denominations.USD]
  )

  return (
    <>
      {chainId !== ChainId.Kovan && (
        <Alert status="error" mb="8">
          <AlertIcon />
          <AlertTitle mr={2}>Error:</AlertTitle>
          <AlertDescription>
            Not available on this network. Please switch to Kovan.
          </AlertDescription>
        </Alert>
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
