import { ethers, deployments, network } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { PriceConsumerV3 } from 'types/typechain'

skip
  .if(developmentChains.includes(network.name))
  .describe('PriceConsumerV3 Integration Tests', () => {
    let priceConsumerV3: PriceConsumerV3

    beforeEach(async () => {
      const PriceConsumerV3 = await deployments.get('PriceConsumerV3')
      priceConsumerV3 = (await ethers.getContractAt(
        'PriceConsumerV3',
        PriceConsumerV3.address
      )) as PriceConsumerV3
    })

    it('should return a positive value', async () => {
      let result = await priceConsumerV3.getLatestPrice()
      expect(result).to.be.gt(0)
    })
  })
