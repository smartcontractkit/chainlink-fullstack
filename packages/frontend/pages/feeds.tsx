import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useContractCall, useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { Interface } from '@ethersproject/abi'
import { Layout } from '../components/layout/Layout'
import { contractConfig } from '../conf/config'

const formatPrice = (value: BigNumber) => value.toNumber() / 10 ** 8

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
        <Text fontSize="xl">
          ETH/USD: {ethUsdPrice && formatPrice(ethUsdPrice)}
        </Text>
      </Box>
    </Layout>
  )
}

export default Feeds
