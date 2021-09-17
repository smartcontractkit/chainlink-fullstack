export const networkConfig: Record<
  number,
  { name: string; ethUsdPriceFeed: string }
> = {
  4: {
    name: 'rinkeby',
    ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
  },
  42: {
    name: 'kovan',
    ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
  },
  80001: {
    name: 'mumbai',
    ethUsdPriceFeed: '0x0715A7794a1dc8e42615F059dD6e406A6594651A',
  },
};
