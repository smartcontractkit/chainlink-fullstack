import React, { useCallback, useEffect, useReducer } from 'react'
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Code,
  Stack,
} from '@chakra-ui/react'
import { useEthers, useContractFunction } from '@usedapp/core'
import blockies from 'blockies-ts'
import { Layout } from '../components/layout/Layout'
import { useContract } from '../hooks/useContract'
import { contractConfig } from '../conf/config'
import { RandomNumberConsumer } from 'types/typechain'

/**
 * Prop Types
 */
type StateType = {
  randomNumber: string
  loading: boolean
}
type ActionType =
  | {
      type: 'SET_RANDOM_NUMBER'
      randomNumber: StateType['randomNumber']
    }
  | {
      type: 'SET_LOADING'
      loading: StateType['loading']
    }

/**
 * Component
 */
const initialState: StateType = {
  randomNumber: '',
  loading: false,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_RANDOM_NUMBER':
      return {
        ...state,
        randomNumber: action.randomNumber,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      }
    default:
      throw new Error()
  }
}

function VRF(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { chainId } = useEthers()
  const randomNumberConsumer = useContract<RandomNumberConsumer>(
    contractConfig[chainId]?.randomNumberConsumer.address,
    contractConfig[chainId]?.randomNumberConsumer.abi
  )
  const { send: sendGetRandomNumber } = useContractFunction(
    randomNumberConsumer,
    'getRandomNumber',
    { transactionName: 'Randomness Request' }
  )

  const requestRandomNumber = useCallback(async () => {
    if (randomNumberConsumer) {
      try {
        await sendGetRandomNumber()
        dispatch({ type: 'SET_LOADING', loading: true })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error: ', error)
      }
    }
  }, [randomNumberConsumer, sendGetRandomNumber])

  const fetchRandomNumber = useCallback(async () => {
    if (randomNumberConsumer) {
      try {
        const data = await randomNumberConsumer.randomResult()
        dispatch({ type: 'SET_RANDOM_NUMBER', randomNumber: data.toString() })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error: ', error)
      }
    }
  }, [randomNumberConsumer])

  useEffect(() => {
    if (randomNumberConsumer) {
      randomNumberConsumer.on('FulfilledRandomness', fetchRandomNumber)
      return () => {
        randomNumberConsumer.off('FulfilledRandomness', fetchRandomNumber)
      }
    }
  }, [randomNumberConsumer, fetchRandomNumber])

  let blockieImageSrc
  if (state.randomNumber && typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: state.randomNumber }).toDataURL()
  }

  return (
    <Layout>
      <Heading as="h1" mb="8">
        VRF
      </Heading>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <Button
          onClick={requestRandomNumber}
          isLoading={state.loading}
          loadingText="Fulfilling request"
          colorScheme="teal"
        >
          Request randomness
        </Button>
        {state.randomNumber && (
          <Stack spacing={2} mt={4}>
            <Text fontSize="xl">Result</Text>
            <Code size="xs" colorScheme="red">
              {state.randomNumber}
            </Code>
            <Image boxSize="200px" src={blockieImageSrc} alt="Random image" />
          </Stack>
        )}
      </Box>
    </Layout>
  )
}

export default VRF
