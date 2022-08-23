import React, { useCallback, useEffect, useState } from 'react'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import { ChainId } from '@usedapp/core'
import { BigNumber, ethers } from 'ethers'
import { formatBtc } from '../../lib/utils'
import config, { WbtcPorAddress } from '../../conf/config'
import { AggregatorV3InterfaceABI } from '../../contracts/external'
// @ts-ignore
import { AggregatorV3Interface } from 'types/typechain'

const providerMainnet = new ethers.providers.JsonRpcProvider(
  config.readOnlyUrls[ChainId.Mainnet].toString()
)

const wbtcPorAggregator = new ethers.Contract(
  WbtcPorAddress,
  AggregatorV3InterfaceABI,
  providerMainnet
) as AggregatorV3Interface

export function ProofOfReserve(): JSX.Element {
  const [result, setResult] = useState<BigNumber>()

  const fetchData = useCallback(async () => {
    const data = await wbtcPorAggregator.latestRoundData()
    setResult(data.answer)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <HStack>
      <Text fontSize="xl">WBTC PoR:</Text>
      {!result && <Spinner color="teal" />}
      {result && <Text fontSize="xl">{formatBtc(result)}</Text>}
    </HStack>
  )
}
