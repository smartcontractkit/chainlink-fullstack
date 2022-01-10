import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

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

  useEffect(() => {
    if (message === 'unknown account #0') {
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
