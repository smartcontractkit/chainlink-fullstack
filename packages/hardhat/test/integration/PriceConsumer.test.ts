import { ethers, deployments, network } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { PriceConsumer } from 'types/typechain'

skip
  .if(developmentChains.includes(network.name))
  .describe('PriceConsumer Integration Tests', () => {
    let priceConsumer: PriceConsumer

    beforeEach(async () => {
      const PriceConsumer = await deployments.get('PriceConsumer')
      priceConsumer = (await ethers.getContractAt(
        'PriceConsumer',
        PriceConsumer.address
      )) as unknown as PriceConsumer
    })

    it('should successfully make request and get a result', async () => {
      const ethAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
      const usdAddress = '0x0000000000000000000000000000000000000348'

      let result = await priceConsumer.getPrice(ethAddress, usdAddress)
      expect(result).to.be.gt(0)
    })
  })
