import React from 'react'
import { Heading } from '@chakra-ui/react'
import { Layout, Section } from '../components/layout'
import { SelectFeed, PriceFeed, ProofOfReserve } from '../components/feeds'

function Feeds(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1" mb="8">
        Data Feeds
      </Heading>
      <Section>
        <PriceFeed />
      </Section>
      <Section>
        <SelectFeed />
      </Section>
      <Section>
        <ProofOfReserve />
      </Section>
    </Layout>
  )
}

export default Feeds
