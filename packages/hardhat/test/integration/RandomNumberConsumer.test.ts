import { ethers, deployments, network, getChainId, run } from 'hardhat';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { developmentChains, networkConfig } from '../../helper-hardhat-config';
import { autoFundCheck } from '../../utils';
import { RandomNumberConsumer, LinkToken } from 'types/typechain';

skip.if(developmentChains.includes(network.name)).
  describe('RandomNumberConsumer Integration Tests', async function () {

    let randomNumberConsumer: RandomNumberConsumer, linkToken: LinkToken;

    beforeEach(async () => {
      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer');
      randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address) as unknown as RandomNumberConsumer;

      const chainId = await getChainId();
      const linkTokenAddress = networkConfig[chainId].linkToken as string;
      linkToken = await ethers.getContractAt('LinkToken', linkTokenAddress) as unknown as LinkToken;

      if (await autoFundCheck(randomNumberConsumer.address, chainId, linkTokenAddress)) {
        await run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress });
      }
    });

    it('should successfully make a VRF request and get a result', async () => {
      const transaction = await randomNumberConsumer.getRandomNumber();
      await transaction.wait();

      //wait 60 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 60000));

      //Now check the result
      const result = await randomNumberConsumer.randomResult();
      //console.log("VRF Result: ", result.toString());
      expect(result).to.be.gt(0);
    });
  });
