import React from 'react'
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
  return (
    <Alert status="error" mb="8">
      <AlertIcon />
      <AlertTitle mr={2}>Error:</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
