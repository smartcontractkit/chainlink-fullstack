import { Heading, Text, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Section } from '../components/layout'

function HomeIndex(): JSX.Element {
  return (
    <>
      <Heading as="h1" mb="4">
        Automation
      </Heading>
      <Text fontSize="xl">
        Reliably execute smart contract functions using a variety of triggers.
      </Text>
      <Section>
        <Heading as="h2" size="md" mb="2">
          Batch NFT Demo App
        </Heading>
        <Text mb="4">
          Create batch-revealed NFT collections powered by Chainlink Automation
          & VRF.
        </Text>
        <Link href="https://automation.chainlink-demo.app" isExternal>
          Go to Demo <ExternalLinkIcon mx="2px" />
        </Link>
      </Section>
    </>
  )
}

export default HomeIndex
