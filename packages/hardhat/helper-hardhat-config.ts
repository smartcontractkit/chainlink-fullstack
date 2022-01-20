export const networkConfig: Record<
  string,
  {
    name: string
    linkToken?: string
    feedRegistry?: string
    ethUsdPriceFeed?: string
    vrfCoordinator?: string
    keyHash: string
    oracle?: string
    jobId: string
    fee: string
    fundAmount: string
  }
> = {
  '31337': {
    name: 'hardhat',
    keyHash:
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    jobId: '29fa9aa13bf1468788b7cc4a500a45b8',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '4': {
    name: 'rinkeby',
    linkToken: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
    ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
    vrfCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
    keyHash:
      '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
    oracle: '0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e',
    jobId: '6d1bfe27e7034b1d87b5270556b17277',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '42': {
    name: 'kovan',
    linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
    feedRegistry: '0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0',
    ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
    vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
    keyHash:
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    oracle: '0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8',
    jobId: 'd5270d1c311941d0b08bead21fea7747',
    fee: '100000000000000000',
    fundAmount: '1000000000000000000',
  },
  '80001': {
    name: 'mumbai',
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    ethUsdPriceFeed: '0x0715A7794a1dc8e42615F059dD6e406A6594651A',
    vrfCoordinator: '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
    keyHash:
      '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
    oracle: '0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9',
    jobId: 'da20aae0e4c843f6949e5cb3f7cfe8c4',
    fee: '100000000000000',
    fundAmount: '100000000000000',
  },
}

export const developmentChains = ['hardhat', 'localhost']
