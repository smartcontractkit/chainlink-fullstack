import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Multicall', { from: deployer });
}

export default func;
