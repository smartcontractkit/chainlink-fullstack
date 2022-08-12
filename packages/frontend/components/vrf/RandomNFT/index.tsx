import React, { useCallback, useState, useEffect } from 'react'
import { Text, Image, Button, Stack, Tooltip } from '@chakra-ui/react'
import { useContractFunction, useEthers } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { getRequestStatus, getContractError } from '../../../lib/utils'
import { useContract } from '../../../hooks/useContract'
import { ExternalLink } from './ExternalLink'
import { Error } from '../../Error'
// @ts-ignore
import { RandomSVG } from '../../../../types/typechain'

/**
 * Constants & Helpers
 */
const parseMetadata = (encoded: string): Metadata =>
  JSON.parse(atob(encoded.split(',')[1]))

/**
 * Types
 */
type Metadata = {
  name: string
  description: string
  image: string
}

/**
 * Component
 */
export function RandomNFT(): JSX.Element {
  const { account, error } = useEthers()

  const [pending, setPending] = useState(false)
  const [fulfilled, setFulfilled] = useState(false)
  const [tokenId, setTokenId] = useState<BigNumber | undefined>()
  const [metadata, setMetadata] = useState<Metadata | undefined>()

  const randomSvg = useContract<RandomSVG>('RandomSVG')

  const {
    send: create,
    state: createState,
    events: createEvents,
  } = useContractFunction(randomSvg, 'create', {
    transactionName: 'NFT Request',
  })

  const {
    send: finish,
    state: finishState,
    events: finishEvents,
  } = useContractFunction(randomSvg, 'finishMint', {
    transactionName: 'NFT Mint Finish',
  })

  const createRequest = async () => {
    await create()
    setTokenId(undefined)
    setFulfilled(false)
  }

  const getMetadata = useCallback(async () => {
    const result = await randomSvg.tokenURI(tokenId)
    return parseMetadata(result)
  }, [randomSvg, tokenId])

  useEffect(() => {
    if (createEvents) {
      const event = createEvents.find((e) => e.name === 'requestedRandomSVG')
      if (event) {
        setTokenId(event.args.tokenId)
      }
    }
  }, [createEvents])

  useEffect(() => {
    if (randomSvg && tokenId) {
      randomSvg.on('CreatedUnfinishedRandomSVG', (id: BigNumber) => {
        if (tokenId.eq(id)) {
          setFulfilled(true)
          setPending(true)
          randomSvg.removeAllListeners()
        }
      })
    }
  }, [randomSvg, tokenId])

  useEffect(() => {
    if (finishEvents) {
      if (finishEvents.find((e) => e.name === 'CreatedRandomSVG')) {
        getMetadata().then((result) => {
          setMetadata(result)
          setPending(false)
        })
      }
    }
  }, [finishEvents, getMetadata])

  const isCreating =
    createState.status === 'Mining' ||
    (createState.status === 'Success' && !fulfilled)

  const isFinishing =
    finishState.status === 'Mining' ||
    (finishState.status === 'Success' && !metadata)

  const hasError =
    createState.status === 'Exception' || finishState.status === 'Exception'

  const errorMessage = createState.errorMessage || finishState.errorMessage

  return (
    <>
      {hasError && <Error message={getContractError(errorMessage)} />}
      {!pending && (
        <Tooltip
          label="Request random number and mint new NFT associated with the result"
          placement="right-start"
          fontSize="xs"
          hasArrow
        >
          <Button
            onClick={createRequest}
            isLoading={isCreating}
            loadingText={getRequestStatus(createState.status)}
            colorScheme="teal"
            disabled={isCreating || !account || !!error}
          >
            {metadata ? 'Request New NFT' : 'Request NFT'}
          </Button>
        </Tooltip>
      )}
      {pending && (
        <Tooltip
          label="Use the random number from first step to generate unique SVG and store it as on-chain NFT metadata"
          placement="right-start"
          fontSize="xs"
          defaultIsOpen
          hasArrow
        >
          <Button
            onClick={() => finish(tokenId)}
            isLoading={isFinishing}
            loadingText="Finishing Minting"
            colorScheme="teal"
            disabled={isFinishing || !account}
          >
            Finish Minting
          </Button>
        </Tooltip>
      )}
      {metadata && (
        <Stack spacing={2} mt={4}>
          <Text fontSize="xl">Result</Text>
          <Image
            src={metadata.image}
            alt="Random SVG"
            boxSize="360px"
            backgroundColor="white"
            borderRadius="lg"
            mt="8"
          />
          <ExternalLink tokenId={tokenId} />
        </Stack>
      )}
    </>
  )
}
