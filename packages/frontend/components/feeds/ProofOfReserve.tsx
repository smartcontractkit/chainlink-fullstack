import React, { useCallback, useEffect, useState } from 'react'
import { HStack, Spinner, Text } from '@chakra-ui/react'
import { ChainId } from '@usedapp/core'
import { BigNumber, ethers } from 'ethers'
import { formatBtc } from '../../lib/utils'
import config, { contractConfig, ContractId } from '../../conf/config'
// @ts-ignore
import { AggregatorV3Interface } from 'types/typechain'

const providerMainnet = new ethers.providers.JsonRpcProvider(
  config.readOnlyUrls[ChainId.Mainnet]
)
const contractDeployment =
  contractConfig[ChainId.Mainnet][ContractId.WbtcPorAggregator]

const wbtcPorAggregator = new ethers.Contract(
  contractDeployment.address,
  contractDeployment.abi,
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
