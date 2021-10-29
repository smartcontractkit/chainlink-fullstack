import React from 'react'
import { Heading } from '@chakra-ui/react'
import { Layout, Section } from '../components/layout'
import { RandomNFT, RandomNumber } from '../components/vrf'

function VRF(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1" mb="8">
        VRF
      </Heading>
      <Section>
        <RandomNumber />
      </Section>
      <Section>
        <RandomNFT />
      </Section>
    </Layout>
  )
}

export default VRF
