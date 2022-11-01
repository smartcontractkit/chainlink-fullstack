import { ethers, deployments, network } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { RandomNumberConsumer } from 'types/typechain'

skip
  .if(developmentChains.includes(network.name))
  .describe('RandomNumberConsumer Integration Tests', async function () {
    let randomNumberConsumer: RandomNumberConsumer

    beforeEach(async () => {
      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
      randomNumberConsumer = (await ethers.getContractAt(
        'RandomNumberConsumer',
        RandomNumberConsumer.address
      )) as RandomNumberConsumer
    })

    it('should successfully make a VRF request and get a result', async () => {
      const transaction = await randomNumberConsumer.getRandomNumber()
      await transaction.wait()

      //wait 7 min for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 420000))

      //Now check the result
      const result = await randomNumberConsumer.randomResult()
      //console.log("VRF Result: ", result.toString());
      expect(result).to.be.gt(0)
    }).timeout(520000)
  })
