import { ethers, deployments, network, getChainId, run } from 'hardhat';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { developmentChains, networkConfig } from '../../helper-hardhat-config';
import { autoFundCheck } from '../../utils';
import { APIConsumer, LinkToken } from 'types/typechain';

skip.if(developmentChains.includes(network.name)).
  describe('APIConsumer Integration Tests', () => {

    let apiConsumer: APIConsumer, linkToken: LinkToken;

    beforeEach(async () => {
      const APIConsumer = await deployments.get('APIConsumer');
      apiConsumer = await ethers.getContractAt('APIConsumer', APIConsumer.address) as unknown as APIConsumer;

      const chainId = await getChainId();
      const linkTokenAddress = networkConfig[chainId].linkToken as string;
      linkToken = await ethers.getContractAt('LinkToken', linkTokenAddress) as unknown as LinkToken;

      if (await autoFundCheck(apiConsumer.address, chainId, linkTokenAddress)) {
        await run("fund-link", { contract: apiConsumer.address, linkaddress: linkTokenAddress });
      }
    });

    it('should successfully make an external API request and get a result', async () => {
      const transaction = await apiConsumer.requestVolumeData();
      await transaction.wait();

      //wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000));

      //Now check the result
      const result = await apiConsumer.volume();
      expect(result).to.be.gt(0);
    });
  });
