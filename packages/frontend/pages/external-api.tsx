import React from 'react'
import { Heading, Text, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useEthers, ChainId } from '@usedapp/core'
import { RequestBuilder } from '../components/api'
import { Section } from '../components/layout'
import { Error } from '../components/Error'

function ExternalAPI(): JSX.Element {
  const { chainId } = useEthers()

  return (
    <>
      {chainId === ChainId.Rinkeby && (
        <Error message="Oracle on Rinkeby is in maintenance mode. Please switch to Kovan." />
      )}
      <Heading as="h1" mb="8">
        External API
      </Heading>
      <Text fontSize="xl">
        Request &amp; Receive data from any API in your smart contracts.
      </Text>
      <Section>
        <RequestBuilder />
        <Text my="4">
          Consume data from any API via HTTP GET request, through
          Chainlink&apos;s decentralized oracle network. It provides smart
          contracts with the ability to push and pull data, facilitating the
          interoperability between on-chain and off-chain applications.
        </Text>
        <Link
          href="https://docs.chain.link/docs/make-a-http-get-request/"
          isExternal
        >
          Learn More <ExternalLinkIcon mx="2px" />
        </Link>
      </Section>
    </>
  )
}

export default ExternalAPI
