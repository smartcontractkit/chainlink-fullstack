import React from 'react'
import {
  Box,
  Heading,
  Button,
  HStack,
  Input,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useContractFunction, TransactionState } from '@usedapp/core'
import { ContractId } from '../../conf/config'
import { useContract } from '../../hooks/useContract'
import { APIRequestBuilder } from 'types/typechain'

export const ExternalApi = (): JSX.Element => {
  const [url, setURL] = React.useState('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD')
  const [path, setPath] = React.useState('RAW.ETH.USD.VOLUME24HOUR')
  const [multi, setMultiplier] = React.useState(18)
  const [multiLbl, setMultiplierLbl] = React.useState('1000000000000000000')
  const [requestId, setRequestId] = React.useState('')
  const [data, setData] = React.useState('')
  const [uiError, setUiError] = React.useState('')
  
  const apiRequestBuilder = useContract<APIRequestBuilder>(ContractId.APIRequestBuilder)

  const { send, state, events } = useContractFunction(
    apiRequestBuilder,
    'requestData',
    { transactionName: 'External API Request' }
  )

  const requestData = React.useCallback(async () => {
    if(!url || !path) {
      //TODO: error
      setUiError('Check your data input!')
      return 
    }
    else {
      setUiError('')
    }
    setData('')
    setRequestId('')
    
    //await send(url, path, BigNumber.from('1' + '0'.repeat(multi)))
    await send(url, path, BigNumber.from(`1${'0'.repeat(multi)}`))
    setData(null)
  }, [send])

  const readData = React.useCallback(async () => {
    const res = (await apiRequestBuilder.data()).toString()
    // if multi is empty(false) or 1 live the whole number
    const len = multi > 1 ? res.length - multi : 0
    // if len 0 return the whole number else add dot on len position
    const data = len ? `${res.slice(0, len)}.${res.slice(len)}` : res
    setData(data)
  }, [apiRequestBuilder])

  React.useEffect(() => {
    if (events) {
      const event = events.find((e) => e.name === 'ChainlinkRequested')
      if (event) {
        setRequestId(event.args.id)
      }
    }
  }, [events])

  React.useEffect(() => {
    if (apiRequestBuilder && requestId) {
      apiRequestBuilder.on('ChainlinkFulfilled', (id: string) => {
        if (requestId === id) {
          readData()
          apiRequestBuilder.removeAllListeners()
        }
      })
    }
  }, [apiRequestBuilder, requestId, readData])

  React.useEffect(() => {
    setMultiplierLbl('1' + '0'.repeat(Number(multi)))
  }, [multi])

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !data)

  const hasError = state.status === 'Exception'

  const getLoadingText = (status: TransactionState) =>
    (status === 'Mining' && 'Mining Request') ||
    (status === 'Success' && 'Fulfilling Request')

  return (
    <HStack>
      <Box>
        {hasError && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{state.errorMessage}</AlertDescription>
          </Alert>
        )}
        {uiError && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{uiError}</AlertDescription>
          </Alert>
        )}
        <Heading as="h2" size="md" mb="4">
          External Api Request
        </Heading>
        Data from <Input value={url} placeholder="Enter api url..."  onChange={(event) => setURL(event.target.value)}/>
        Path from <Input value={path} placeholder="Enter optional path url..." onChange={(event) => setPath(event.target.value)}/>
        Digits after decimal point
        <Select
          value={multi}
          onChange={(event) => setMultiplier(Number(event.target.value))}>
          {Array(19)
            .fill('')
            .map((_, i) => (<option key={i}>{i}</option>))
          }
        </Select>
        <Text mt="2">
          Multiplier: { multiLbl }
        </Text>
        <Button
          mt="4"
          onClick={requestData}
          isLoading={isLoading}
          loadingText={getLoadingText(state.status)}
          colorScheme="teal"
        >
          New Oracle Request
        </Button>
        {data && (
          <Text fontSize="xl" mt="2">
            Data: { data }
          </Text>
        )}
      </Box>
    </HStack>
  )
}
