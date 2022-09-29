import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Text,
  Tooltip,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { formatFixed } from '@ethersproject/bignumber'
import { useContractFunction, useEthers } from '@usedapp/core'
import { Error } from '../../components/Error'
import { useContract } from '../../hooks/useContract'
import { getRequestStatus, getContractError } from '../../lib/utils'
// @ts-ignore
import { APIConsumer } from 'types/typechain'

const DEFAULT_MULTIPLIER = '1000000000000000000'
const DEFAULT_URL =
  'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD'
const DEFAULT_PATH = 'RAW,ETH,USD,VOLUME24HOUR'
const URL_REGEX =
  /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
const PATH_REGEX = /^[a-zA-Z_][\w]*(?:,[\w]+)*$/
const MULTIPLIER_REGEX = /^(1(0)*)$/

export function RequestBuilder(): JSX.Element {
  const { account, error } = useEthers()

  const [url, setURL] = useState(DEFAULT_URL)
  const [path, setPath] = useState(DEFAULT_PATH)
  const [multiplier, setMultiplier] = useState(DEFAULT_MULTIPLIER)
  const [requestId, setRequestId] = useState('')
  const [data, setData] = useState('')

  const apiConsumer = useContract<APIConsumer>('APIConsumer')

  const { send, state, events } = useContractFunction(
    apiConsumer,
    'requestData',
    { transactionName: 'External API Request' }
  )

  const requestData = async () => {
    setRequestId('')
    await send(url, path, BigNumber.from(multiplier))
    setData(null)
  }

  const readData = useCallback(async () => {
    const res = await apiConsumer.data()
    const data = formatFixed(
      res,
      multiplier.split('').filter((e) => e === '0').length
    )
    setData(data)
  }, [apiConsumer, multiplier])

  useEffect(() => {
    if (events) {
      const event = events.find((e) => e.name === 'ChainlinkRequested')
      if (event) {
        setRequestId(event.args.id)
      }
    }
  }, [events])

  useEffect(() => {
    if (apiConsumer && requestId) {
      apiConsumer.on('ChainlinkFulfilled', (id: string) => {
        if (requestId === id) {
          readData()
          apiConsumer.removeAllListeners()
        }
      })
    }
  }, [apiConsumer, requestId, readData])

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !data)

  const hasError = state.status === 'Exception'

  const isInvalidUrl = !URL_REGEX.test(url)
  const isInvalidPath = !PATH_REGEX.test(path)
  const isInvalidMultiplier = !MULTIPLIER_REGEX.test(multiplier)
  const isInvalid = isInvalidUrl || isInvalidPath || isInvalidMultiplier

  return (
    <>
      {hasError && <Error message={getContractError(state.errorMessage)} />}
      <FormControl isInvalid={isInvalidUrl}>
        <FormLabel htmlFor="url">Data Source</FormLabel>
        <Tooltip
          label="Set the URL to perform the GET request on"
          placement="right-start"
          fontSize="xs"
          hasArrow
        >
          <Input
            value={url}
            placeholder="Enter API URL..."
            id="url"
            bgColor="white"
            onChange={(event) => setURL(event.target.value)}
          />
        </Tooltip>
        {isInvalidUrl && <FormErrorMessage>URL is not valid.</FormErrorMessage>}
      </FormControl>

      <FormControl mt="4" isInvalid={isInvalidPath}>
        <FormLabel htmlFor="path">Path to Number</FormLabel>
        <Tooltip
          label="Set dot separated path to find the desired data in the API response"
          placement="right-start"
          fontSize="xs"
          hasArrow
        >
          <Input
            value={path}
            placeholder="Enter Path..."
            id="path"
            bgColor="white"
            onChange={(event) => setPath(event.target.value)}
          />
        </Tooltip>
        {isInvalidPath && (
          <FormErrorMessage>Path is not valid.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl mt="4" isInvalid={isInvalidMultiplier}>
        <FormLabel htmlFor="multiplier">Multiplier</FormLabel>
        <Tooltip
          label="The multiplier from the response value"
          placement="right-start"
          id="multiplier"
          fontSize="xs"
          hasArrow
        >
          <Input
            value={multiplier}
            placeholder="Enter Multiplier..."
            bgColor="white"
            onChange={(event) => setMultiplier(event.target.value)}
          />
        </Tooltip>
        {isInvalidMultiplier && (
          <FormErrorMessage>Multiplier is not valid.</FormErrorMessage>
        )}
      </FormControl>

      <Button
        mt="4"
        onClick={requestData}
        isLoading={isLoading}
        loadingText={getRequestStatus(state.status)}
        colorScheme="teal"
        disabled={isInvalid || isLoading || !account || !!error}
      >
        Custom API Request
      </Button>
      {data && (
        <Text fontSize="xl" mt="4">
          Result: {data}
        </Text>
      )}
    </>
  )
}
