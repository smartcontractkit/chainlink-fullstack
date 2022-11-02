import React, { useCallback, useEffect, useState } from 'react'
import { Text, Button, Code, Stack } from '@chakra-ui/react'
import { useContractFunction, useEthers } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { getRequestStatus, getContractError } from '../../lib/utils'
import { useContract } from '../../hooks/useContract'
import { Error } from '../Error'
// @ts-ignore
import { RandomNumberConsumer } from '../../../types/typechain'

export function RandomNumber(): JSX.Element {
  const { account, error } = useEthers()

  const [requestId, setRequestId] = useState<BigNumber>()
  const [randomNumber, setRandomNumber] = useState('')

  const randomNumberConsumer = useContract<RandomNumberConsumer>(
    'RandomNumberConsumer'
  )

  const { send, state, events } = useContractFunction(
    randomNumberConsumer,
    'getRandomNumber',
    { transactionName: 'Randomness Request', gasLimitBufferPercentage: 250 }
  )

  const requestRandomNumber = async () => {
    await send()
    setRandomNumber('')
  }

  const readRandomNumber = useCallback(async () => {
    const result = await randomNumberConsumer.randomResult()
    setRandomNumber(String(result))
  }, [randomNumberConsumer])

  useEffect(() => {
    if (events) {
      const event = events.find((e) => e.name === 'RequestedRandomness')
      if (event) {
        setRequestId(event.args.requestId)
      }
    }
  }, [events])

  useEffect(() => {
    if (randomNumberConsumer && requestId) {
      randomNumberConsumer.on('FulfilledRandomness', (id: BigNumber) => {
        if (requestId.eq(id)) {
          readRandomNumber()
          randomNumberConsumer.removeAllListeners()
        }
      })
    }
  }, [randomNumberConsumer, requestId, readRandomNumber])

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !randomNumber)

  const hasError = state.status === 'Exception'

  return (
    <>
      {hasError && <Error message={getContractError(state.errorMessage)} />}
      <Button
        onClick={requestRandomNumber}
        isLoading={isLoading}
        loadingText={getRequestStatus(state.status)}
        colorScheme="teal"
        disabled={isLoading || !account || !!error}
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
