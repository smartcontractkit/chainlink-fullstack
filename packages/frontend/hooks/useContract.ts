import { useEthers } from '@usedapp/core'
import { Contract, ethers } from 'ethers'
import { useMemo } from 'react'
import { contractConfig, ContractId } from '../conf/config'

export function useContract<T extends Contract = Contract>(
  id: ContractId
): T | null {
  const { library, chainId } = useEthers()

  const { abi, address } = contractConfig[chainId]?.[id] || {}

  return useMemo(() => {
    if (!library) return null
    if (!address) return null

    return new ethers.Contract(address, abi, library.getSigner()) as T
  }, [abi, address, library])
}
