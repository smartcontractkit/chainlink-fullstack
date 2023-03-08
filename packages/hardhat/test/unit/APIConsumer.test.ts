import { ethers, deployments, network, getChainId, run } from 'hardhat'
import { BigNumber } from 'ethers'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains, networkConfig } from '../../helper-hardhat-config'
import { autoFundCheck } from '../../utils'
import { APIConsumer, LinkToken } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('APIConsumer Unit Tests', () => {
    let apiConsumer: APIConsumer, linkToken: LinkToken

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(['mocks', 'api'])
      const LinkToken = await deployments.get('LinkToken')
      linkToken = (await ethers.getContractAt(
        'LinkToken',
        LinkToken.address
      )) as LinkToken

      const linkTokenAddress = linkToken.address

      const APIConsumer = await deployments.get('APIConsumer')
      apiConsumer = (await ethers.getContractAt(
        'APIConsumer',
        APIConsumer.address
      )) as APIConsumer

      if (await autoFundCheck(apiConsumer.address, chainId, linkTokenAddress)) {
        const fundAmount = networkConfig[chainId]['fundAmount']
        await linkToken.transfer(apiConsumer.address, fundAmount)
      }
    })

    it('should successfully make an API request', async () => {
      const transaction = await apiConsumer.requestData(
        'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD',
        'RAW,ETH,USD,VOLUME24HOUR',
        '1000000000000000000'
      )
      const tx_receipt = await transaction.wait()
      const requestId = BigNumber.from(
        tx_receipt.events && tx_receipt.events[0].topics[1]
      )
      expect(requestId).to.be.gt(0)
    })
  })
