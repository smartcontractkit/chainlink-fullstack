import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Code,
  Stack,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
} from '@chakra-ui/react'
import { TransactionState, useContractFunction } from '@usedapp/core'
import blockies from 'blockies-ts'
import { Layout } from '../components/layout/Layout'
import { useContract } from '../hooks/useContract'
import { ContractId } from '../conf/config'

/**
 * Helpers
 */
const getLoadingText = (status: TransactionState) =>
  (status === 'Mining' && 'Mining Request') ||
  (status === 'Success' && 'Fulfilling Request')

/**
 * Component
 */
function VRF(): JSX.Element {
  const [randomNumber, setRandomNumber] = useState('')

  const randomNumberConsumer = useContract(ContractId.RandomNumberConsumer)

  const { send, state } = useContractFunction(
    randomNumberConsumer,
    'getRandomNumber',
    { transactionName: 'Randomness Request' }
  )

  const requestRandomNumber = useCallback(async () => {
    await send()
    setRandomNumber('')
  }, [send])

  const readRandomNumber = useCallback(async () => {
    const result = await randomNumberConsumer.randomResult()
    setRandomNumber(String(result))
  }, [randomNumberConsumer])

  useEffect(() => {
    if (randomNumberConsumer) {
      randomNumberConsumer.on('FulfilledRandomness', readRandomNumber)
      return () => {
        randomNumberConsumer.off('FulfilledRandomness', readRandomNumber)
      }
    }
  }, [randomNumberConsumer, readRandomNumber])

  let blockieImageSrc
  if (randomNumber && typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: randomNumber }).toDataURL()
  }

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !randomNumber)

  const hasError = state.status === 'Exception'

  return (
    <Layout>
      <Heading as="h1" mb="8">
        VRF
      </Heading>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        {hasError && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{state.errorMessage}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={requestRandomNumber}
          isLoading={isLoading}
          loadingText={getLoadingText(state.status)}
          colorScheme="teal"
        >
          Request Randomness
        </Button>
        {randomNumber && (
          <Stack spacing={2} mt={4}>
            <Text fontSize="xl">Result</Text>
            <Code size="xs" colorScheme="red">
              {randomNumber}
            </Code>
            <Image boxSize="200px" src={blockieImageSrc} alt="Random image" />
          </Stack>
        )}
      </Box>
    </Layout>
  )
}

export default VRF
