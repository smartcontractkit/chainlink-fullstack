import React from 'react'
import { Code, Heading, HStack, Link, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Section } from '../components/layout'
import { SelectFeed, PriceFeed, ProofOfReserve } from '../components/feeds'

function Feeds(): JSX.Element {
  return (
    <>
      <Heading as="h1" mb="4">
        Data Feeds
      </Heading>
      <Text fontSize="xl">
        Retrieve the latest prices and data points of assets in your smart
        contracts.
      </Text>
      <Section>
        <PriceFeed />
        <Text my="4">
          Consuming price feed by address via <Code>AggregatorV3Interface</Code>
          .
        </Text>
        <HStack>
          <Link
            href="https://docs.chain.link/docs/get-the-latest-price"
            isExternal
          >
            Learn More <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href="https://docs.chain.link/docs/reference-contracts"
            isExternal
          >
            Contract Addresses <ExternalLinkIcon mx="2px" />
          </Link>
        </HStack>
      </Section>
      <Section>
        <SelectFeed />
        <Text my="4">
          Feed Registry is an on-chain mapping of assets to feeds. It enables
          you to query Chainlink data feeds from asset addresses directly,
          without needing to know the feed contract addresses.
        </Text>
        <Link href="https://docs.chain.link/docs/feed-registry" isExternal>
          Learn More <ExternalLinkIcon mx="2px" />
        </Link>
      </Section>
      <Section>
        <ProofOfReserve />
        <Text my="4">
          Proof of Reserve enables the reliable and timely monitoring of reserve
          assets using automated audits based on cryptographic truth.
        </Text>
        <Link href="https://chain.link/proof-of-reserve" isExternal>
          Learn More <ExternalLinkIcon mx="2px" />
        </Link>
      </Section>
    </>
  )
}

export default Feeds
