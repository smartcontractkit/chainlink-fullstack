import { ethers, deployments, network, getChainId, run } from 'hardhat'
import { BigNumber } from 'ethers'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { autoFundCheck } from '../../utils'
import { APIRequestBuilder, LinkToken } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('APIRequestBuilder Unit Tests', () => {
    let apiRequestBuilder: APIRequestBuilder, linkToken: LinkToken

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(['mocks', 'api'])
      const LinkToken = await deployments.get('LinkToken')
      linkToken = (await ethers.getContractAt(
        'LinkToken',
        LinkToken.address
      )) as LinkToken

      const linkTokenAddress = linkToken.address

      const APIRequestBuilder = await deployments.get('APIRequestBuilder')
      apiRequestBuilder = (await ethers.getContractAt(
        'APIRequestBuilder',
        APIRequestBuilder.address
      )) as unknown as APIRequestBuilder

      if (
        await autoFundCheck(
          apiRequestBuilder.address,
          chainId,
          linkTokenAddress
        )
      ) {
        await run('fund-link', {
          contract: apiRequestBuilder.address,
          linkaddress: linkTokenAddress,
        })
      }
    })

    it('should successfully make an API request', async () => {
      const transaction = await apiRequestBuilder.requestData(
        'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD',
        'RAW.ETH.USD.VOLUME24HOUR',
        '1000000000000000000'
      )
      const tx_receipt = await transaction.wait()
      const requestId = BigNumber.from(
        tx_receipt.events && tx_receipt.events[0].topics[1]
      )
      expect(requestId).to.be.gt(0)
    })
  })
