import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const yourContract = await deploy('YourContract', {
    from: deployer,
    args: ['Hello, Hardhat!']
  });
  console.log('YourContract deployed to:', yourContract.receipt?.contractAddress);

  const multicallContract = await deploy('Multicall', { from: deployer });
  console.log('Multicall deployed to:', multicallContract.receipt?.contractAddress);
}

export default func;
