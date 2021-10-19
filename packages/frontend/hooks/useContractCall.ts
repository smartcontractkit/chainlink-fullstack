import {
  useEthers,
  useContractCall as useDappContractCall,
} from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { contractConfig, ContractId } from '../conf/config'

export function useContractCall<T>(
  id: ContractId,
  method: string,
  args: any[] = []
): T | undefined {
  const { chainId } = useEthers()

  const contract = chainId && contractConfig[chainId][id]

  const [result] =
    useDappContractCall(
      contract && {
        abi: new Interface(contract.abi),
        address: contract.address,
        method,
        args,
      }
    ) ?? []

  return result as T
}
