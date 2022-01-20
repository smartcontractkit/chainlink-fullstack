import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'
import { networkConfig } from './helper-hardhat-config'

export const autoFundCheck = async (
  contractAddr: string,
  chainId: string,
  linkTokenAddress: string
) => {
  console.log('Checking to see if contract can be auto-funded with LINK:')
  const accounts = await ethers.getSigners()
  const signer = accounts[0]
  const LinkToken = await ethers.getContractFactory('LinkToken')
  const linkTokenContract = new ethers.Contract(
    linkTokenAddress,
    LinkToken.interface,
    signer
  )
  const accountBalance: BigNumber = await linkTokenContract.balanceOf(
    signer.address
  )
  const contractBalance: BigNumber = await linkTokenContract.balanceOf(
    contractAddr
  )
  const fundAmount = BigNumber.from(networkConfig[chainId]['fundAmount'])
  if (
    accountBalance.gt(fundAmount) &&
    fundAmount.gt(0) &&
    contractBalance.lt(fundAmount)
  ) {
    //user has enough LINK to auto-fund
    //and the contract isn't already funded
    return true
  } else {
    //user doesn't have enough LINK, print a warning
    console.log(
      "Account doesn't have enough LINK to fund contracts, or you're deploying to a network where auto funding is not done by default"
    )
    console.log(
      'Please obtain LINK via the faucet at https://' +
        networkConfig[chainId].name +
        '.chain.link/, then run the following command to fund contract with LINK:'
    )
    console.log(
      'npx hardhat fund-link --contract ' +
        contractAddr +
        ' --network ' +
        networkConfig[chainId].name +
        chainId ===
        '31337'
        ? ' --linkaddress ' + linkTokenAddress
        : ''
    )
    return false
  }
}
