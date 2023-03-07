import { ethers, deployments, network, getChainId, run } from 'hardhat'
import { BigNumber } from 'ethers'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains, networkConfig } from '../../helper-hardhat-config'
import { autoFundCheck } from '../../utils'
import { RandomNumberConsumer, LinkToken } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('RandomNumberConsumer Unit Tests', () => {
    let randomNumberConsumer: RandomNumberConsumer, linkToken: LinkToken

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(['mocks', 'vrf'])
      const LinkToken = await deployments.get('LinkToken')
      linkToken = (await ethers.getContractAt(
        'LinkToken',
        LinkToken.address
      )) as LinkToken

      const linkTokenAddress = linkToken.address

      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
      randomNumberConsumer = (await ethers.getContractAt(
        'RandomNumberConsumer',
        RandomNumberConsumer.address
      )) as RandomNumberConsumer

      if (
        await autoFundCheck(
          randomNumberConsumer.address,
          chainId,
          linkTokenAddress
        )
      ) {
        const fundAmount = networkConfig[chainId]['fundAmount']
        await linkToken.transfer(randomNumberConsumer.address, fundAmount)
      }
    })

    it('should successfully make an external random number request', async () => {
      const transaction = await randomNumberConsumer.getRandomNumber()
      const tx_receipt = await transaction.wait()
      const requestId = BigNumber.from(
        tx_receipt.events && tx_receipt.events[2].topics[1]
      )
      expect(requestId).to.not.be.null
    })
  })
