import fs from 'fs'
import { ethers, deployments, network } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { RandomSVGV2, VRFCoordinatorMockV2 } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('RandomSVGV2 Unit Tests', () => {
    let rsNFT: RandomSVGV2,
      vrfCoordinatorV2: VRFCoordinatorMockV2

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'vrf', 'nft'])

      const VRFCoordinatorMockV2 = await deployments.get('VRFCoordinatorMockV2')
      vrfCoordinatorV2 = (await ethers.getContractAt(
        'VRFCoordinatorMockV2',
        VRFCoordinatorMockV2.address
      )) as VRFCoordinatorMockV2

      const RandomSVGV2 = await deployments.get('RandomSVGV2')
      rsNFT = (await ethers.getContractAt(
        'RandomSVGV2',
        RandomSVGV2.address
      )) as RandomSVGV2
    })

    it('should return the correct URI', async () => {
      const transactionCreate = await rsNFT.create()
      const receipt = await transactionCreate.wait()
      const [, requestId, tokenId] =
        (receipt.events && receipt.events[1].topics) || []
      const fakeRandomNumber = 77777

      const transactionResponse = await vrfCoordinatorV2.callBackWithRandomness(
        requestId,
        [fakeRandomNumber],
        rsNFT.address
      )
      
      await transactionResponse.wait()

      const transactionMint = await rsNFT.finishMint(tokenId)
      await transactionMint.wait()

      const expectedURI = fs.readFileSync('./test/data/randomSVG.txt', 'utf8')
      const uri = await rsNFT.tokenURI(0)
      expect(uri).to.equal(expectedURI)
    })
  })
