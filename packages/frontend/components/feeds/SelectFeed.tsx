import React, { useState, useCallback, useEffect } from 'react'
import { Box, HStack, Select, Spinner, Text } from '@chakra-ui/react'
import { BigNumber, ethers } from 'ethers'
import { ChainId } from '@usedapp/core'
import { formatUsd } from '../../lib/utils'
import config, {
  Denominations,
  LinkTokenAddress,
  FeedRegistryAddress,
} from '../../conf/config'
import { FeedRegistryABI } from '../../contracts/external'
// @ts-ignore
import { FeedRegistryInterface } from 'types/typechain'

const providerMainnet = new ethers.providers.JsonRpcProvider(
  config.readOnlyUrls[ChainId.Mainnet].toString()
)

const feedRegistryAggregator = new ethers.Contract(
  FeedRegistryAddress,
  FeedRegistryABI,
  providerMainnet
) as FeedRegistryInterface

export function SelectFeed(): JSX.Element {
  const [base, setBase] = useState(LinkTokenAddress)
  const [result, setResult] = useState<BigNumber>()

  const fetchData = useCallback(async (base: string) => {
    const data = await feedRegistryAggregator.latestRoundData(
      base,
      Denominations.USD
    )
    setResult(data.answer)
  }, [])

  useEffect(() => {
    setResult(undefined)
    fetchData(base)
  }, [fetchData, base])

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
