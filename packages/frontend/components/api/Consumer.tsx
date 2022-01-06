import React, { useCallback, useEffect, useState } from 'react'
import { Text, Button } from '@chakra-ui/react'
import { useContractFunction, TransactionState } from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
import { useContract } from '../../hooks/useContract'
import { ContractId } from '../../conf/config'
import { Error } from '../../components/Error'
// @ts-ignore
import { APIConsumer } from '../../../types/typechain'

/**
 * Helpers
 */
const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const formatEther = (wei: BigNumber) =>
  formatter.format(parseFloat(utils.formatEther(wei)))

const getLoadingText = (status: TransactionState) =>
  (status === 'Mining' && 'Mining Request') ||
  (status === 'Success' && 'Fulfilling Request')

/**
 * Component
 */
export function Consumer(): JSX.Element {
  const [requestId, setRequestId] = useState('')
  const [volumeData, setVolumeData] = useState<BigNumber | undefined>()

  const apiConsumer = useContract<APIConsumer>(ContractId.ApiConsumer)

  const { send, state, events } = useContractFunction(
    apiConsumer,
    'requestVolumeData',
    { transactionName: 'External API Request' }
  )

  const requestVolumeData = async () => {
    await send()
    setVolumeData(null)
  }

  const readVolumeData = useCallback(async () => {
    const volume = await apiConsumer.volume()
    setVolumeData(volume)
  }, [apiConsumer])

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
          readVolumeData()
          apiConsumer.removeAllListeners()
        }
      })
    }
  }, [apiConsumer, requestId, readVolumeData])

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !volumeData)

  const hasError = state.status === 'Exception'

  return (
    <>
      {hasError && <Error message={state.errorMessage} />}
      <Button
        onClick={requestVolumeData}
        isLoading={isLoading}
        loadingText={getLoadingText(state.status)}
        colorScheme="teal"
      >
        Request External API
      </Button>
      {volumeData && (
        <Text fontSize="xl" mt="2">
          ETH VOLUME 24H: {formatEther(volumeData)}
        </Text>
      )}
    </>
  )
}
