import { Contract } from 'ethers'
import { useCall } from '@usedapp/core'
import { useContractConfig } from './useContractConfig'

export function useContractCall<T>(
  name: string,
  method: string,
  args: any[] = []
): T | undefined {
  const contract = useContractConfig(name)

  const { value } =
    useCall(
      contract && {
        contract: new Contract(contract.address, contract.abi),
        method,
        args,
      }
    ) ?? {}

  return value?.[0]
}
