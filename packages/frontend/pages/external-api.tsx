import React, { useCallback, useEffect, useReducer } from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useEthers, useContractFunction } from '@usedapp/core'
import { Layout } from '../components/layout/Layout'
import { useContract } from '../hooks/useContract'
import { contractConfig } from '../conf/config'
import { APIConsumer as APIConsumerType } from '../types/typechain'

/**
 * Prop Types
 */
type StateType = {
  ethUsdVolume24h?: number
  loading: boolean
}
type ActionType =
  | {
      type: 'SET_VOLUME_DATA'
      ethUsdVolume24h: StateType['ethUsdVolume24h']
    }
  | {
      type: 'SET_LOADING'
      loading: StateType['loading']
    }

/**
 * Component
 */
const initialState: StateType = {
  ethUsdVolume24h: undefined,
  loading: false,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_VOLUME_DATA':
      return {
        ...state,
        ethUsdVolume24h: action.ethUsdVolume24h,
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

function ExternalAPI(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { chainId } = useEthers()
  const apiConsumer = useContract<APIConsumerType>(
    contractConfig[chainId]?.apiConsumer.address,
    contractConfig[chainId]?.apiConsumer.abi
  )
  const { send: sendRequestVolumeData } = useContractFunction(
    apiConsumer,
    'requestVolumeData',
    { transactionName: 'External API Request' }
  )

  const requestVolumeData = useCallback(async () => {
    if (apiConsumer) {
      try {
        await sendRequestVolumeData()
        dispatch({ type: 'SET_LOADING', loading: true })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error: ', error)
      }
    }
  }, [apiConsumer, sendRequestVolumeData])

  const readVolumeData = useCallback(async () => {
    if (apiConsumer) {
      try {
        const data = await apiConsumer.volume()
        dispatch({ type: 'SET_VOLUME_DATA', ethUsdVolume24h: +data / 10 ** 18 })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error: ', error)
      }
    }
  }, [apiConsumer])

  useEffect(() => {
    if (apiConsumer) {
      apiConsumer.on('ChainlinkFulfilled', readVolumeData)
      return () => {
        apiConsumer.off('ChainlinkFulfilled', readVolumeData)
      }
    }
  }, [apiConsumer, readVolumeData])

  return (
    <Layout>
      <Heading as="h1" mb="8">
        External API
      </Heading>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <Heading as="h2" size="sm" mb="4">
          Volume data from CryptoCompare API
        </Heading>
        <Button
          onClick={requestVolumeData}
          isLoading={state.loading}
          loadingText="Fulfilling request"
          colorScheme="teal"
        >
          Oracle Request
        </Button>
        {state.ethUsdVolume24h && (
          <Text fontSize="xl" mt="2">
            ETH VOLUME 24H: ${state.ethUsdVolume24h}
          </Text>
        )}
      </Box>
    </Layout>
  )
}

export default ExternalAPI
