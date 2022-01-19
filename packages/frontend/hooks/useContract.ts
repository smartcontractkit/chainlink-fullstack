import { useEthers } from '@usedapp/core'
import { Contract, ethers } from 'ethers'
import { useMemo } from 'react'
import { useContractConfig } from './useContractConfig'

export function useContract<T extends Contract = Contract>(
  name: string
): T | null {
  const { library } = useEthers()

  const contract = useContractConfig(name)

  return useMemo(() => {
    if (!library) return null
    if (!contract?.address) return null

    return new ethers.Contract(
      contract.address,
      contract.abi,
      library.getSigner()
    ) as T
  }, [contract, library])
}
