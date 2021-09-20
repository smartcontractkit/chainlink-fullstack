import { Box, Heading, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useReducer } from 'react'
import { Layout } from '../components/layout/Layout'
import { useContract } from '../hooks/useContract'
import PriceConsumerV3 from '../artifacts/contracts/localhost/PriceConsumerV3.json'
import { PriceConsumerV3 as PriceConsumerV3Type } from '../types/typechain'

/**
 * Prop Types
 */
type StateType = {
  ethUsdPrice: number
}
type ActionType = {
  type: 'SET_ETH_USD_PRICE'
  ethUsdPrice: StateType['ethUsdPrice']
}

/**
 * Component
 */
const initialState: StateType = {
  ethUsdPrice: 0,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_ETH_USD_PRICE':
      return {
        ...state,
        ethUsdPrice: action.ethUsdPrice,
      }
    default:
      throw new Error()
  }
}

function Feeds(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const priceConsumer = useContract<PriceConsumerV3Type>(
    PriceConsumerV3.address,
    PriceConsumerV3.abi
  )

  const fetchPrice = useCallback(async () => {
    if (priceConsumer) {
      try {
        const data = await priceConsumer.getLatestPrice()
        dispatch({ type: 'SET_ETH_USD_PRICE', ethUsdPrice: +data / 10 ** 8 })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error: ', error)
      }
    }
  }, [priceConsumer])

  useEffect(() => {
    fetchPrice()
  }, [fetchPrice])

  return (
    <Layout>
      <Heading as="h1" mb="8">
        Data Feeds
      </Heading>
      <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100">
        <Text fontSize="xl">ETH/USD: {state.ethUsdPrice}</Text>
      </Box>
    </Layout>
  )
}

export default Feeds
