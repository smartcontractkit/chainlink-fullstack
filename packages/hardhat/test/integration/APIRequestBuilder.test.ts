import { ethers, deployments, network } from 'hardhat';
import { expect } from 'chai';
import skip from 'mocha-skip-if';
import { developmentChains } from '../../helper-hardhat-config';
import { APIRequestBuilder } from 'types/typechain';

skip.if(developmentChains.includes(network.name)).
  describe('APIRequestBuilder Integration Tests', () => {

    let apiRequestBuilder: APIRequestBuilder;

    beforeEach(async () => {
      const APIRequestBuilder = await deployments.get('APIRequestBuilder');
      apiRequestBuilder = await ethers.getContractAt('APIRequestBuilder', APIRequestBuilder.address) as unknown as APIRequestBuilder;
    });

    it('should successfully make an external API request and get a result', async () => {
      const transaction = await apiRequestBuilder.requestData('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD','RAW.ETH.USD.VOLUME24HOUR','1000000000000000000');
      await transaction.wait();

      //wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000));

      //Now check the result
      const result = await apiRequestBuilder.data();
      expect(result).to.be.gt(0);
    });
  });
