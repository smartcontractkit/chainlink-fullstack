import { ethers, deployments, network, getChainId, run } from 'hardhat';
import { BigNumber, Contract } from 'ethers';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { developmentChains } from '../../helper-hardhat-config';
import { autoFundCheck } from '../../utils';

skip.if(!developmentChains.includes(network.name)).
  describe('RandomNumberConsumer Unit Tests', () => {
    let randomNumberConsumer: Contract, linkToken: Contract;

    beforeEach(async () => {
      const chainId = await getChainId();
      await deployments.fixture(['mocks', 'vrf']);
      const LinkToken = await deployments.get('LinkToken');
      linkToken = await ethers.getContractAt('LinkToken', LinkToken.address);

      const linkTokenAddress = linkToken.address;

      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer');
      randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address);

      if (await autoFundCheck(randomNumberConsumer.address, chainId, linkTokenAddress)) {
        await run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress });
      }
    });

    it('should successfully make an external random number request', async () => {
      const transaction = await randomNumberConsumer.getRandomNumber();
      const tx_receipt = await transaction.wait();
      const requestId = BigNumber.from(tx_receipt.events[2].topics[1]);

      expect(requestId).to.not.be.null;
    });
  });
