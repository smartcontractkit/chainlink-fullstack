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

  const RandomNumberConsumer = await deployments.get('RandomNumberConsumer');
  const randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address);

  if (await autoFundCheck(randomNumberConsumer.address, chainId, linkTokenAddress)) {
    await run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress });
  }
}

export default func;
