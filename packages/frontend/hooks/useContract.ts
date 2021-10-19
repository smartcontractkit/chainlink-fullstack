import { useEthers } from '@usedapp/core'
import { Contract, ethers } from 'ethers'
import { useMemo } from 'react'
import { contractConfig, ContractId } from '../conf/config'

export function useContract<T extends Contract = Contract>(
  id: ContractId
): T | null {
  const { library, chainId } = useEthers()

  const contract = chainId && contractConfig[chainId][id]

  return useMemo(() => {
    if (!library) return null
    if (!contract.address) return null

    return new ethers.Contract(
      contract.address,
      contract.abi,
      library.getSigner()
    ) as T
  }, [contract, library])
}
