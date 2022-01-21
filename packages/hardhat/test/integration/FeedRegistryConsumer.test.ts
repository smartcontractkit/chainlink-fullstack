import { ethers, deployments, network } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { FeedRegistryConsumer } from 'types/typechain'

skip
  .if(developmentChains.includes(network.name))
  .describe('FeedRegistryConsumer Integration Tests', () => {
    let feedRegistryConsumer: FeedRegistryConsumer

    beforeEach(async () => {
      const FeedRegistryConsumer = await deployments.get('FeedRegistryConsumer')
      feedRegistryConsumer = (await ethers.getContractAt(
        'FeedRegistryConsumer',
        FeedRegistryConsumer.address
      )) as FeedRegistryConsumer
    })

    it('should successfully make request and get a result', async () => {
      const ethAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
      const usdAddress = '0x0000000000000000000000000000000000000348'

      let result = await feedRegistryConsumer.getPrice(ethAddress, usdAddress)
      expect(result).to.be.gt(0)
    })
  })
