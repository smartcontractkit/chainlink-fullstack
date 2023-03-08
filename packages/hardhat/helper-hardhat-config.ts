export const networkConfig: Record<
  string,
  {
    name: string
    linkToken?: string
    feedRegistry?: string
    ethUsdPriceFeed?: string
    wrapperAddress?: string
    vrfCoordinatorV2?: string
    vrfSubscriptionId?: string
    vrfGasLane?: string
    vrfCallbackGasLimit?: {
      randomNumberConsumer: string
      randomSVG: string
    }
    keyHash?: string
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
    vrfGasLane:
      '0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15',
    vrfCallbackGasLimit: {
      randomNumberConsumer: '500000',
      randomSVG: '500000',
    },
    fee: '100000000000000000',
    fundAmount: '50000000000000000000',
  },
  '5': {
    name: 'goerli',
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    ethUsdPriceFeed: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    wrapperAddress: '0x708701a1DfF4f478de54383E49a627eD4852C816',
    vrfCoordinatorV2: '0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D',
    vrfSubscriptionId: '0',
    vrfGasLane:
      '0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15',
    vrfCallbackGasLimit: {
      randomNumberConsumer: '150000',
      randomSVG: '200000',
    },
    keyHash:
      '0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a',
    oracle: '0xCC79157eb46F5624204f47AB42b3906cAA40eaB7',
    jobId: 'ca98366cc7314957b8c012c72f05aeeb',
    fee: '100000000000000000',
    fundAmount: '5000000000000000000',
  },
  '11155111': {
    name: 'sepolia',
    linkToken: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
    ethUsdPriceFeed: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    wrapperAddress: '0xab18414CD93297B0d12ac29E63Ca20f515b3DB46',
    vrfCoordinatorV2: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
    vrfSubscriptionId: '0',
    vrfGasLane:
      '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
    vrfCallbackGasLimit: {
      randomNumberConsumer: '150000',
      randomSVG: '200000',
    },
    oracle: '0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD',
    jobId: 'ca98366cc7314957b8c012c72f05aeeb',
    fee: '100000000000000000',
    fundAmount: '5000000000000000000',
  },
}

export const developmentChains = ['hardhat', 'localhost']
