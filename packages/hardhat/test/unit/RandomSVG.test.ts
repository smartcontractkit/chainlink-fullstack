import fs from 'fs'
import { ethers, deployments, network } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { RandomSVG, VRFCoordinatorV2Mock } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('RandomSVG Unit Tests', () => {
    let randomSvg: RandomSVG
    let vrfCoordinatorV2: VRFCoordinatorV2Mock

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'vrf', 'nft'])

      const VRFCoordinatorMockV2 = await deployments.get('VRFCoordinatorV2Mock')
      vrfCoordinatorV2 = (await ethers.getContractAt(
        'VRFCoordinatorV2Mock',
        VRFCoordinatorMockV2.address
      )) as VRFCoordinatorV2Mock

      const RandomSVG = await deployments.get('RandomSVG')
      randomSvg = (await ethers.getContractAt(
        'RandomSVG',
        RandomSVG.address
      )) as RandomSVG
    })

    it('should return the correct URI', async () => {
      const transactionCreate = await randomSvg.create()
      const receipt = await transactionCreate.wait()
      const [, requestId, tokenId] =
        (receipt.events && receipt.events[1].topics) || []
      const fakeRandomNumber = 77777

      const transactionResponse =
        await vrfCoordinatorV2.fulfillRandomWordsWithOverride(
          requestId,
          randomSvg.address,
          [fakeRandomNumber]
        )

      await transactionResponse.wait()
      const transactionMint = await randomSvg.finishMint(tokenId)
      await transactionMint.wait()

      const expectedURI = fs.readFileSync('./test/data/randomSVG.txt', 'utf8')
      const uri = await randomSvg.tokenURI(0)
      expect(uri).to.equal(expectedURI)
    })
  })
