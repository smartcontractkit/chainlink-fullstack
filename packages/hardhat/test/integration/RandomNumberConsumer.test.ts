import { ethers, deployments, network } from 'hardhat';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { BigNumber, Contract, ContractTransaction } from 'ethers';
import { developmentChains } from '../../helper-hardhat-config';

skip.if(developmentChains.includes(network.name)).
  describe('RandomNumberConsumer Integration Tests', async function () {

    let randomNumberConsumer: Contract;

    beforeEach(async () => {
      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer');
      randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address);
    });

    it('should successfully make a VRF request and get a result', async () => {
      const transaction: ContractTransaction = await randomNumberConsumer.getRandomNumber();
      await transaction.wait();

      //wait 60 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 60000));

      //Now check the result
      const result: BigNumber = await randomNumberConsumer.randomResult();
      //console.log("VRF Result: ", result.toString());
      expect(result).to.be.gt(0);
    });
  });
