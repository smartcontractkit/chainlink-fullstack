import { useContractCall as useDappContractCall } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { useContractConfig } from './useContractConfig'

export function useContractCall<T>(
  name: string,
  method: string,
  args: any[] = []
): T | undefined {
  const contract = useContractConfig(name)

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
