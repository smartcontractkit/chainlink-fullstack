import { Currency, FiatCurrency, TransactionState } from '@usedapp/core'
import { BigNumber } from 'ethers'

// From https://github.com/NoahZinsmeister/web3-react/blob/v6/example/pages/index.tsx
// Parses the possible errors provided by web3-react
export function getErrorMessage(error: Error): string {
  if (error.message.includes("No injected provider available") ) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error.name === "ChainIdError") {
    return "You're connected to an unsupported network. Please switch to Goerli or Sepolia."
  } else if (
    error.message.includes("The user rejected the request") ||
    error.message.includes("User rejected the request")
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

export function getContractError(msg: string): string {
  if (msg.includes('The execution failed due to an exception.')) {
    return `${msg} Please check if the contract has enough LINK to pay the oracle.`
  } else {
    return msg
  }
}

const btcFormatter = new Currency('Bitcoin', 'BTC', 8, {
  fixedPrecisionDigits: 2,
  useFixedPrecision: true,
})

export const formatBtc = (value: BigNumber): string =>
  btcFormatter.format(value.toString())

const usdFormatter = new FiatCurrency('United States Dollar', 'USD', 8, {
  fixedPrecisionDigits: 2,
})

export const formatUsd = (value: BigNumber): string =>
  usdFormatter.format(value.toString())

export const getRequestStatus = (status: TransactionState): string =>
  (status === 'Mining' && 'Mining Request') ||
  (status === 'Success' && 'Fulfilling Request')
