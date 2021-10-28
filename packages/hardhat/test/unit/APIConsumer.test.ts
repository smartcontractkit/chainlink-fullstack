import { ethers, deployments, network, getChainId, run } from 'hardhat';
import { BigNumber, Contract } from 'ethers';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { developmentChains, autoFundCheck } from '../../helper-hardhat-config';

skip.if(!developmentChains.includes(network.name)).
  describe('APIConsumer Unit Tests', () => {
    let apiConsumer: Contract, linkToken: Contract;

    beforeEach(async () => {
      const chainId = await getChainId();
      await deployments.fixture(['mocks', 'api']);
      const LinkToken = await deployments.get('LinkToken');
      linkToken = await ethers.getContractAt('LinkToken', LinkToken.address);

      const linkTokenAddress = linkToken.address;
         
      const APIConsumer = await deployments.get('APIConsumer');
      apiConsumer = await ethers.getContractAt('APIConsumer', APIConsumer.address);

      if (await autoFundCheck(apiConsumer.address, chainId, linkTokenAddress)) {
        await run("fund-link", { contract: apiConsumer.address, linkaddress: linkTokenAddress });
      }
    });

    it('should successfully make an API request', async () => {
      const transaction = await apiConsumer.requestVolumeData();
      const tx_receipt = await transaction.wait();
      const requestId = BigNumber.from(tx_receipt.events[0].topics[1]);

      expect(requestId).to.be.gt(0);
    });
  });
