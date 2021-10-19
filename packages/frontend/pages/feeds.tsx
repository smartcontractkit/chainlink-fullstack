import React from 'react'
import { Box, Heading, HStack, Select, Spinner, Text } from '@chakra-ui/react'
import { FiatCurrency } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { Layout } from '../components/layout/Layout'
import { useContractCall } from '../hooks/useContractCall'
import { ContractId, Denominations, LinkTokenAddress } from '../conf/config'

/**
 * Helpers
 */
const formatter = new FiatCurrency('United States Dollar', 'USD', 8, {
  fixedPrecisionDigits: 2,
})

const formatUsd = (value: BigNumber) => formatter.format(value.toString())

/**
 * Components
 */
function EthUsdFeed(): JSX.Element {
  const result = useContractCall<BigNumber>(
    ContractId.PriceConsumerV3,
    'getLatestPrice'
  )

  return (
    <HStack>
      <Text fontSize="xl">ETH/USD:</Text>
      {!result && <Spinner color="teal" />}
      {result && <Text fontSize="xl">{formatUsd(result)}</Text>}
    </HStack>
  )
}

function SelectFeed(): JSX.Element {
  const [base, setBase] = React.useState(LinkTokenAddress)

  const result = useContractCall<BigNumber>(
    ContractId.PriceConsumer,
    'getPrice',
    [base, Denominations.USD]
  )

  return (
    <HStack>
      <Box>
        <Select value={base} onChange={(event) => setBase(event.target.value)}>
          <option value={LinkTokenAddress}>LINK</option>
          <option value={Denominations.ETH}>ETH</option>
          <option value={Denominations.BTC}>BTC</option>
        </Select>
      </Box>
      <Text fontSize="xl">/ USD:</Text>
      {!result && <Spinner color="teal" />}
      {result && <Text fontSize="xl">{formatUsd(result)}</Text>}
    </HStack>
  )
}

function Feeds(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1" mb="8">
        Data Feeds
      </Heading>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <EthUsdFeed />
      </Box>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <SelectFeed />
      </Box>
    </Layout>
  )
}

export default Feeds
