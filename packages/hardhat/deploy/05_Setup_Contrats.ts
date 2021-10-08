import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { networkConfig, autoFundCheck } from '../helper-hardhat-config';

const func: DeployFunction = async function ({
  deployments,
  getChainId,
  run
}: HardhatRuntimeEnvironment) {

  const { get } = deployments;
  const chainId = await getChainId();
  let linkTokenAddress: string;

  if (chainId == '1337') {
    const linkToken = await get('LinkToken');
    linkTokenAddress = linkToken.address;
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string;
  }

  // Try Auto-fund VRFConsumer contract
  const RandomNumberConsumer = await deployments.get('RandomNumberConsumer');
  const randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address);
  if (await autoFundCheck(randomNumberConsumer.address, chainId, linkTokenAddress)) {
    await run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress });
  }

  // Try Auto-fund APIConsumer contract with LINK
  const APIConsumer = await deployments.get('APIConsumer');
  const apiConsumer = await ethers.getContractAt('APIConsumer', APIConsumer.address);
  if (await autoFundCheck(apiConsumer.address, chainId, linkTokenAddress)) {
    await run("fund-link", { contract: apiConsumer.address, linkaddress: linkTokenAddress });
  }
}

func.tags = ['all'];

export default func;