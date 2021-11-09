# Chainlink Fullstack Demo App

End-to-end implementation of the following Chainlink features using Hardhat development environment and Next.js frontend framework:

* [Request & Receive data](https://docs.chain.link/docs/request-and-receive-data/)
* [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts/)
* [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)

Built with:
* [Next.js](https://nextjs.org)
* [TypeScript](https://www.typescriptlang.org)
* [Hardhat](https://hardhat.org)
* [TypeChain](https://github.com/dethcrypto/TypeChain)
* [Ethers.js](https://docs.ethers.io/v5/)
* [useDApp](https://usedapp.io)
* [Chakra UI](https://chakra-ui.com)
* Linting with [ESLint](https://eslint.org)
* Formatting with [Prettier](https://prettier.io)

## Requirements

[Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Git](https://git-scm.com/downloads)

## Quick Start

Clone the repo and install all dependencies

```bash
git clone https://github.com/hackbg/chainlink-fullstack
cd chainlink-fullstack

git submodule init
git submodule update

yarn install
```

Start up the local Hardhat network and deploy all contracts

```bash
yarn chain
```

Start up the local development server to make the front-end app running at http://localhost:3000
```bash
yarn dev
```

To interact with the local contract, be sure to switch your MetaMask Network to Localhost 8545

## Environment Variables

Deploying to a public network requires setting `RPC_URL` [environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa). If you're not running a node you can get one at [Infura's site](https://infura.io).

Additionally you'll need to set a `MNEMONIC` variable from your wallet, ie Metamask. The account must have enough funds to deploy the contracts, as well as LINK which can be obtained from faucets. It is also possible to set a `PRIVATE_KEY` instead with some changes in `hardhat.config.js`.

Running the front-end app in read-only mode also requires setting an environment variable `INFURA_KEY`.

To make this easier there are `.env` example files in the `hardhat` and `frontend` workspaces.

## Deploy Contracts

This will run the deploy scripts to a local Hardhat network
```bash
yarn deploy
```

To deploy on testnet

```bash
yarn deploy --network kovan
```

## Auto-Funding

The Hardhat project will attempt to auto-fund any newly deployed contract that uses Any-API or VRF, which otherwise has to be done manually.

The amount in LINK to send as part of this process can be modified in this [Hardhat Config](https://github.com/hackbg/chainlink-fullstack/blob/main/packages/hardhat/helper-hardhat-config.ts), and are configurable per network.

| Parameter  | Description                                       | Default Value |
| ---------- | :------------------------------------------------ | :------------ |
| fundAmount | Amount of LINK to transfer when funding contracts | 1 LINK        |

If you wish to deploy the smart contracts without performing the auto-funding, run the following command when doing your deployment:

```bash
yarn deploy --tags main
```

## Test

Unit tests will run only locally

```bash
yarn test:hardhat
```

To run integration tests a public network must be specified

```bash
yarn test:hardhat --network kovan
```

## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis)

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
npx hardhat verify --network kovan 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

## Linting

TBD

## References
* [Chainlink Docs](https://docs.chain.link)
* [Chainlink Hardhat Box](https://github.com/smartcontractkit/hardhat-starter-kit)
* [Scaffold ETH](https://github.com/scaffold-eth/scaffold-eth/blob/nextjs-typescript)
