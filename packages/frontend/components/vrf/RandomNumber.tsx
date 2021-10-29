import React, { useCallback, useEffect, useState } from 'react'
import {
  Text,
  Button,
  Code,
  Stack,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
} from '@chakra-ui/react'
import { useContractFunction } from '@usedapp/core'
import { getRequestStatus } from '../../lib/utils'
import { useContract } from '../../hooks/useContract'
import { ContractId } from '../../conf/config'
import { RandomNumberConsumer } from '../../../types/typechain'

export function RandomNumber(): JSX.Element {
  const [randomNumber, setRandomNumber] = useState('')

  const randomNumberConsumer = useContract<RandomNumberConsumer>(
    ContractId.RandomNumberConsumer
  )

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

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !randomNumber)

  const hasError = state.status === 'Exception'

  return (
    <>
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
        loadingText={getRequestStatus(state.status)}
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
        </Stack>
      )}
    </>
  )
}
