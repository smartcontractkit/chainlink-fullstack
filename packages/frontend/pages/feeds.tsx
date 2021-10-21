import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Layout } from '../components/layout/Layout'
import { SelectFeed, PriceFeed, ProofOfReserve } from '../components/feeds'

const Section = (props: { children: React.ReactNode }): JSX.Element => (
  <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100" {...props}></Box>
)

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
