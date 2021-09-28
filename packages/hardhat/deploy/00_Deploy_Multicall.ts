import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId
}: HardhatRuntimeEnvironment) {

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  if (chainId === '1337') {
    await deploy('Multicall', { from: deployer });
  }
}

export default func;
