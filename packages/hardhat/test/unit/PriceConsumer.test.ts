import { ethers, deployments, network } from 'hardhat';
import { BigNumber } from 'ethers';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { developmentChains } from '../../helper-hardhat-config';
import { PriceConsumer, MockFeedRegistry } from 'types/typechain';

skip.if(!developmentChains.includes(network.name)).
  describe('PriceConsumer Unit Tests', () => {
    let priceConsumer: PriceConsumer, mockFeedRegistry: MockFeedRegistry;

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'feed']);
      const PriceConsumer = await deployments.get('PriceConsumer');
      priceConsumer = await ethers.getContractAt('PriceConsumer', PriceConsumer.address) as unknown as PriceConsumer;

      const MockFeedRegistry = await deployments.get('MockFeedRegistry');
      mockFeedRegistry = await ethers.getContractAt('MockFeedRegistry', MockFeedRegistry.address) as unknown as MockFeedRegistry;
    });

    it('should return the expected value', async () => {
      const mockEthPrice = BigNumber.from(1000);
      const mockEthAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
      const mockUSDAddress = '0x0000000000000000000000000000000000000348';

      await mockFeedRegistry.updateAnswer(mockEthPrice);
      let result = await priceConsumer.getPrice(mockEthAddress, mockUSDAddress);
      expect(result).to.be.equal(mockEthPrice);
    });
  });
