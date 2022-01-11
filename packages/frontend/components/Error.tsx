import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

/**
 * Prop Types
 */
interface ErrorProps {
  message: string
}

/**
 * Component
 */
export function Error({ message }: ErrorProps): JSX.Element {
  const [errorMsg, setErrorMsg] = useState(String)
  const { account } = useEthers()

  useEffect(() => {
    if (account === null) {
      setErrorMsg('No metamask account connected')
    } else {
      setErrorMsg(message)
    }
  }, [])
  return (
    <Alert status="error" mb="8">
      <AlertIcon />
      <AlertTitle mr={2}>Error:</AlertTitle>
      <AlertDescription>{errorMsg}</AlertDescription>
    </Alert>
  )
}
