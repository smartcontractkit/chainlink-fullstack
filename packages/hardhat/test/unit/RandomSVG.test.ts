import fs from 'fs'
import { ethers, deployments, network, getChainId, run } from 'hardhat'
import { expect } from 'chai'
import skip from 'mocha-skip-if'
import { developmentChains } from '../../helper-hardhat-config'
import { autoFundCheck } from '../../utils'
import { RandomSVG, VRFCoordinatorMock, LinkToken } from 'types/typechain'

skip
  .if(!developmentChains.includes(network.name))
  .describe('RandomSVG Unit Tests', () => {
    let rsNFT: RandomSVG,
      linkToken: LinkToken,
      vrfCoordinator: VRFCoordinatorMock

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(['mocks', 'vrf', 'nft'])
      const LinkToken = await deployments.get('LinkToken')
      linkToken = (await ethers.getContractAt(
        'LinkToken',
        LinkToken.address
      )) as unknown as LinkToken

      const linkTokenAddress = linkToken.address

      const RandomSVG = await deployments.get('RandomSVG')
      rsNFT = (await ethers.getContractAt(
        'RandomSVG',
        RandomSVG.address
      )) as unknown as RandomSVG

      const VRFCoordinatorMock = await deployments.get('VRFCoordinatorMock')
      vrfCoordinator = (await ethers.getContractAt(
        'VRFCoordinatorMock',
        VRFCoordinatorMock.address
      )) as unknown as VRFCoordinatorMock

      if (await autoFundCheck(rsNFT.address, chainId, linkTokenAddress)) {
        await run('fund-link', {
          contract: rsNFT.address,
          linkaddress: linkTokenAddress,
        })
      }
    })

    it('should return the correct URI', async () => {
      const transactionCreate = await rsNFT.create()
      const receipt = await transactionCreate.wait()
      const [, requestId, tokenId] =
        (receipt.events && receipt.events[3].topics) || []
      const fakeRandomNumber = 77777

      const transactionResponse = await vrfCoordinator.callBackWithRandomness(
        requestId,
        fakeRandomNumber,
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
