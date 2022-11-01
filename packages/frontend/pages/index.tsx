import NextLink from 'next/link'
import { Heading, Text, Link } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Section } from '../components/layout'

function HomeIndex(): JSX.Element {
  return (
    <>
      <Heading as="h1" mb="4">
        Welcome to the Chainlink Demo App
      </Heading>
      <Text fontSize="xl">
        Full stack starter project showcasing Chainlink products on Ethereum
        (EVM).
      </Text>
      <Section>
        <Heading as="h2" size="md" mb="2">
          Data Feeds
        </Heading>
        <Text mb="4">
          Retrieve the latest prices and data points of assets in your smart
          contracts.
        </Text>
        <NextLink href="/feeds" passHref>
          <Link>
            Go to Demo <ArrowForwardIcon />
          </Link>
        </NextLink>
      </Section>
      <Section>
        <Heading as="h2" size="md" mb="2">
          Randomness (VRF)
        </Heading>
        <Text mb="4">
          Use VRF (Verifiable Random Function) to consume randomness in your
          smart contracts.
        </Text>
        <NextLink href="/vrf" passHref>
          <Link>
            Go to Demo <ArrowForwardIcon />
          </Link>
        </NextLink>
      </Section>
      <Section>
        <Heading as="h2" size="md" mb="2">
          Call External API
        </Heading>
        <Text mb="4">
          Request &amp; Receive data from any API in your smart contracts.
        </Text>
        <NextLink href="/external-api" passHref>
          <Link>
            Go to Demo <ArrowForwardIcon />
          </Link>
        </NextLink>
      </Section>
      <Section>
        <Heading as="h2" size="md" mb="2">
          Automation
        </Heading>
        <Text mb="4">
          Reliably execute smart contract functions using a variety of triggers.
        </Text>
        <NextLink href="/automation" passHref>
          <Link>
            Go to Demo <ArrowForwardIcon />
          </Link>
        </NextLink>
      </Section>
    </>
  )
}

export default HomeIndex
