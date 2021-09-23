import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export const networkConfig: Record<
  string,
  {
    name: string;
    linkToken?: string;
    ethUsdPriceFeed?: string;
    vrfCoordinator?: string;
    keyHash: string;
    fee: string;
    fundAmount: string;
  }
> = {
  '1337': {
    name: 'hardhat',
    keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '31337': {
    name: 'localhost',
    keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '4': {
    name: 'rinkeby',
    linkToken: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
    ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
    vrfCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
    keyHash: '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '42': {
    name: 'kovan',
    linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
    ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
    vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
    keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '80001': {
    name: 'mumbai',
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    ethUsdPriceFeed: '0x0715A7794a1dc8e42615F059dD6e406A6594651A',
    vrfCoordinator: '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
    keyHash: '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
    fee: '100000000000000',
    fundAmount: '100000000000000',
  },
};

export const autoFundCheck = async (contractAddr: string, chainId: string, linkTokenAddress: string) => {
  console.log('Checking to see if contract can be auto-funded with LINK:');
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  const LinkToken = await ethers.getContractFactory('LinkToken');
  const linkTokenContract = new ethers.Contract(linkTokenAddress, LinkToken.interface, signer);
  const accountBalance: BigNumber = await linkTokenContract.balanceOf(signer.address);
  const contractBalance: BigNumber = await linkTokenContract.balanceOf(contractAddr);
  const fundAmount = BigNumber.from(networkConfig[chainId]['fundAmount']);
  if (accountBalance.gt(fundAmount) && fundAmount.gt(0) && contractBalance.lt(fundAmount)) {
      //user has enough LINK to auto-fund
      //and the contract isn't already funded
      return true;
  } else { //user doesn't have enough LINK, print a warning
    console.log("Account doesn't have enough LINK to fund contracts, or you're deploying to a network where auto funding is not done by default");
    console.log('Please obtain LINK via the faucet at https://' + networkConfig[chainId].name + '.chain.link/, then run the following command to fund contract with LINK:');
    console.log('npx hardhat fund-link --contract ' + contractAddr + ' --network ' + networkConfig[chainId].name + chainId === '1337' ? ' --linkaddress ' + linkTokenAddress : '');
    return false;
  }
}
