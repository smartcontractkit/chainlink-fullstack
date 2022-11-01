import { useEthers } from '@usedapp/core'
import deployedContracts from '../contracts/hardhat_contracts.json'

type DeployedHardhatContractsJson = {
  [chainId: string]: [
     {
      name: string
      chainId: string
      contracts: {
        [contractName: string]: {
          address: string
          abi?: any[]
        }
      }
    }
  ]
}

const contractsConfig = deployedContracts as unknown as DeployedHardhatContractsJson

export function useContractConfig(name: string) {
  const { chainId } = useEthers()

  return (
    chainId &&
    contractsConfig[chainId] &&
    Object.values(contractsConfig[chainId]).find(
      (c) => c.chainId === String(chainId)
    )?.contracts?.[name]
  )
}
