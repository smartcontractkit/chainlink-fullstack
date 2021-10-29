import React from 'react'
import { Box } from '@chakra-ui/react'

interface SectionProps {
  children: React.ReactNode
}

export const Section = (props: SectionProps): JSX.Element => (
  <Box maxWidth="container.sm" p="8" mt="8" bg="gray.100" {...props}></Box>
)
