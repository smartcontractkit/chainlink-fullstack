import { ethers, deployments, network } from 'hardhat'
import { BigNumber } from 'ethers'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { FeedRegistryConsumer, MockFeedRegistry } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('FeedRegistryConsumer Unit Tests', () => {
    let feedRegistryConsumer: FeedRegistryConsumer
    let mockFeedRegistry: MockFeedRegistry

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'feed'])
      const FeedRegistryConsumer = await deployments.get('FeedRegistryConsumer')
      feedRegistryConsumer = (await ethers.getContractAt(
        'FeedRegistryConsumer',
        FeedRegistryConsumer.address
      )) as FeedRegistryConsumer

      const MockFeedRegistry = await deployments.get('MockFeedRegistry')
      mockFeedRegistry = (await ethers.getContractAt(
        'MockFeedRegistry',
        MockFeedRegistry.address
      )) as MockFeedRegistry
    })

    it('should return the expected value', async () => {
      const mockEthPrice = BigNumber.from(1000)
      const mockEthAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
      const mockUSDAddress = '0x0000000000000000000000000000000000000348'

      await mockFeedRegistry.updateAnswer(mockEthPrice)
      let result = await feedRegistryConsumer.getPrice(
        mockEthAddress,
        mockUSDAddress
      )
      expect(result).to.be.equal(mockEthPrice)
    })
  })
