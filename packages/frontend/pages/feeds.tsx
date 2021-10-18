import React from 'react'
import { Box, Heading, Spinner, Text } from '@chakra-ui/react'
import { useContractCall, useEthers, FiatCurrency } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { Interface } from '@ethersproject/abi'
import { Layout } from '../components/layout/Layout'
import { contractConfig } from '../conf/config'

/**
 * Helpers
 */
const formatter = new FiatCurrency('United States Dollar', 'USD', 8, {
  fixedPrecisionDigits: 2,
})

const formatUsd = (value: BigNumber) => formatter.format(value.toString())

/**
 * Component
 */
function Feeds(): JSX.Element {
  const { chainId } = useEthers()
  const [ethUsdPrice] =
    useContractCall(
      contractConfig[chainId] && {
        abi: new Interface(contractConfig[chainId].priceConsumer.abi),
        address: contractConfig[chainId].priceConsumer.address,
        method: 'getLatestPrice',
        args: [],
      }
    ) ?? []

  return (
    <Layout>
      <Heading as="h1" mb="8">
        Data Feeds
      </Heading>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        {!ethUsdPrice && <Spinner color="teal" />}
        {ethUsdPrice && (
          <Text fontSize="xl">
            ETH/USD: {ethUsdPrice && formatUsd(ethUsdPrice)}
          </Text>
        )}
      </Box>
    </Layout>
  )
}

export default Feeds
