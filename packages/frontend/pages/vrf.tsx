import React from 'react'
import { Heading, Text, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Section } from '../components/layout'
import { RandomNFT, RandomNumber } from '../components/vrf'

function VRF(): JSX.Element {
  return (
    <>
      <Heading as="h1" mb="4">
        Randomness
      </Heading>
      <Text fontSize="xl">
        Use VRF (Verifiable Random Function) to consume randomness in your smart
        contracts.
      </Text>
      <Section>
        <RandomNumber />
        <Text my="4">
          With every new request for randomness, Chainlink VRF generates a
          random number and cryptographic proof of how that number was
          determined. VRF enables smart contracts to access randomness without
          compromising on security or usability.
        </Text>
        <Link
          href="https://docs.chain.link/docs/get-a-random-number"
          isExternal
        >
          Learn More <ExternalLinkIcon mx="2px" />
        </Link>
      </Section>
      <Section>
        <RandomNFT />
        <Text my="4">
          100% on-chain generated NFT using VRF as randomness source. Each
          request creates and stores an unique Scalable Vector Graphic (SVG).
        </Text>
        <Link href="https://chain.link/education/nfts" isExternal>
          Learn More <ExternalLinkIcon mx="2px" />
        </Link>
      </Section>
    </>
  )
}

export default VRF
