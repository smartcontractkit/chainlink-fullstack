# Chainlink Fullstack Demo App

[![codecov](https://codecov.io/gh/hackbg/chainlink-fullstack/branch/main/graph/badge.svg?token=60ZDWLHB53)](https://codecov.io/gh/hackbg/chainlink-fullstack)

[LIVE DEMO](https://chainlink-demo.app)

End-to-end implementation of the following Chainlink features using Hardhat development environment and Next.js frontend framework:

- [Request & Receive data](https://docs.chain.link/docs/request-and-receive-data/)
- [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts/)
- [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)

Built with:

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Hardhat](https://hardhat.org)
- [TypeChain](https://github.com/dethcrypto/TypeChain)
- [Ethers.js](https://docs.ethers.io/v5/)
- [useDApp](https://usedapp.io)
- [Chakra UI](https://chakra-ui.com)
- Linting with [ESLint](https://eslint.org)
- Formatting with [Prettier](https://prettier.io)

## Requirements

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [Git](https://git-scm.com/downloads)

In order to use the frontend portion of the demo application you will need:

- A crypto wallet such as [Metamask](https://metamask.io/) or [Coinbase Wallet](https://www.coinbase.com/wallet)
- Test $LINK for the relevant testnet. You can get some at the [Chainlink Faucets](https://faucets.chain.link/) page.
- Test $ETH to pay for gas costs. You can get some at the [Chainlink Faucets](https://faucets.chain.link/) page.

## Quick Start

Clone the repo and install all dependencies:

```bash
git clone https://github.com/smartcontractkit/chainlink-fullstack
cd chainlink-fullstack

git submodule init
git submodule update

yarn install
```

Start up the local Hardhat network and deploy all contracts:

```bash
yarn chain
```

In a second terminal start up the local development server run the front-end app:

```bash
yarn dev
```

To interact with the local network, follow this step-by-step guide on how to use [MetaMask with a Hardhat node](https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node).

If you've set the mnemonic from MetaMask the first 20 accounts will be funded with ETH.

## Environment Variables

To make setting environment variables easier there are `.env.example` files in the `hardhat` and `frontend` workspaces. You can copy them to new `.env` files and replace the values with your own.

#### Hardhat

| Name                | Description                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NETWORK_RPC_URL`   | Required to deploy to public networks. Obtain from [Infura's site](https://infura.io).                                                                                                                                      |
| `MNEMONIC`          | Used to derive accounts from wallet seed phrase, ie Metamask. The first account must have enough ETH to deploy the contracts, as well as LINK which can be obtained from [Chainlink's faucets](https://faucets.chain.link). |
| `PRIVATE_KEY`       | Alternative to using mnemonic. Some changes are required in `hardhat.config.js`                                                                                                                                             |
| `ETHERSCAN_API_KEY` | Verify contract code on Etherscan.                                                                                                                                                                                          |

#### Front-end

| Name                     | Description                       |
| ------------------------ | --------------------------------- |
| `NEXT_PUBLIC_INFURA_KEY` | Read-only mode and WalletConnect. |

## Deploy Contracts

This will run the deploy scripts to a local Hardhat network:

```bash
yarn deploy
```

To deploy on a public network:

```bash
yarn deploy --network goerli
```

Before deploying `RandomSVG` contract on a public network, an ID of a prefunded VRF subscription must be set in [`helper-hardhat-config.ts`](/packages/hardhat/helper-hardhat-config.ts).

See how to [Create and Fund a Subscription](https://docs.chain.link/docs/vrf/v2/subscription/ui/).

## Auto-Funding

The Hardhat project will attempt to auto-fund any newly deployed contract that uses Any-API or VRF, which otherwise has to be done manually.

The amount in LINK to send as part of this process can be modified in this [Hardhat Config](https://github.com/hackbg/chainlink-fullstack/blob/main/packages/hardhat/helper-hardhat-config.ts), and are configurable per network.

| Parameter  | Description                                       | Default Value |
| ---------- | :------------------------------------------------ | :------------ |
| fundAmount | Amount of LINK to transfer when funding contracts | 5 LINK        |

If you wish to deploy the smart contracts without performing the auto-funding, run the following command when doing your deployment:

```bash
yarn deploy --tags main
```

## Test

If the test command is executed without a specified network it will run locally and only perform the unit tests:

```bash
yarn test:contracts
```

Integration tests must be run on a public testnet that has Chainlink oracles responding:

```bash
yarn test:contracts --network goerli
```

For coverage report:

```bash
yarn coverage:contracts
```

## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis)

```bash
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```

example:

```bash
npx hardhat verify --network goerli 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

## Format

Fix formatting according to prettier config in the respective workspace:

```bash
yarn format:frontend
yarn format:hardhat
```

## Lint

```bash
yarn lint:frontend
```

## Testnet Contracts

This repo includes deployed and verified contracts on Goerli so the front-end can run without the need to deploy them.

Once the `deploy` command is executed on any network the contracts config will be overwritten and you can start from scratch with your own deployments.

#### Sepolia

| Name                   | Address                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `PriceConsumerV3`      | [0xf37F9826f60870894190B5Ffe89138f3ef10079C](https://sepolia.etherscan.io/address/0xf37F9826f60870894190B5Ffe89138f3ef10079C) |
| `APIConsumer`          | [0x8fEa7488314D44776C7960B3149258827B8ADa31](https://sepolia.etherscan.io/address/0x8fEa7488314D44776C7960B3149258827B8ADa31) |
| `RandomNumberConsumer` | [0xBcFd34a46C2Da1E10568B4691ab2678cB24265db](https://sepolia.etherscan.io/address/0xBcFd34a46C2Da1E10568B4691ab2678cB24265db) |
| `RandomSVG`            | [0xc055B4DA31b7895f60c6335276f47EbD817F98E1](https://sepolia.etherscan.io/address/0xc055B4DA31b7895f60c6335276f47EbD817F98E1) |

#### Goerli

| Name                   | Address                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `PriceConsumerV3`      | [0x46b73aca4AF8D060355beAb7f3C941B214ba0E1F](https://goerli.etherscan.io/address/0x46b73aca4AF8D060355beAb7f3C941B214ba0E1F) |
| `APIConsumer`          | [0xe40D4f1fDf9f0312905bd938Dd396B9149e1F04b](https://goerli.etherscan.io/address/0xe40D4f1fDf9f0312905bd938Dd396B9149e1F04b) |
| `RandomNumberConsumer` | [0x35ea06342a82e091040CbF415cc899228DB4C936](https://goerli.etherscan.io/address/0x35ea06342a82e091040CbF415cc899228DB4C936) |
| `RandomSVG`            | [0xa652548CDAb898d9d885896f464Fd4a07F353aBc](https://goerli.etherscan.io/address/0xa652548CDAb898d9d885896f464Fd4a07F353aBc) |

#### Kovan (deprecated)

| Name                   | Address                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `PriceConsumerV3`      | [0x01E2C7cA6D6A82D059287Cb0bC43a39Cd0ff4B00](https://kovan.etherscan.io/address/0x01E2C7cA6D6A82D059287Cb0bC43a39Cd0ff4B00) |
| `FeedRegistryConsumer` | [0xB9ebb63D4820c45a2Db09d71cefA24daBd047b50](https://kovan.etherscan.io/address/0xB9ebb63D4820c45a2Db09d71cefA24daBd047b50) |
| `APIConsumer`          | [0x14005AB90bc520E20Ffd7815Cae64372abb6b04d](https://kovan.etherscan.io/address/0x14005AB90bc520E20Ffd7815Cae64372abb6b04d) |
| `RandomNumberConsumer` | [0xF9556187bf86823Cf0D7081625F97391642Fc242](https://kovan.etherscan.io/address/0xF9556187bf86823Cf0D7081625F97391642Fc242) |
| `RandomSVG`            | [0xb4Bac68d9Fa99D2852E5dFb124be74de2E8c4F76](https://kovan.etherscan.io/address/0xb4Bac68d9Fa99D2852E5dFb124be74de2E8c4F76) |

#### Rinkeby (deprecated)

| Name                   | Address                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `PriceConsumerV3`      | [0x4998Bd433216bBc56976BCb4Fe5AA240bA766763](https://rinkeby.etherscan.io/address/0x4998Bd433216bBc56976BCb4Fe5AA240bA766763) |
| `APIConsumer`          | [0x43a87559277fd5F6F1AdC6e6331998899634e9Aa](https://rinkeby.etherscan.io/address/0x43a87559277fd5F6F1AdC6e6331998899634e9Aa) |
| `RandomNumberConsumer` | [0xA0e617aaA36Ff4A6bf61C4Ce2Ed66822B1e24726](https://rinkeby.etherscan.io/address/0xA0e617aaA36Ff4A6bf61C4Ce2Ed66822B1e24726) |
| `RandomSVG`            | [0xeC6CcE025e538D12E52D8C90181849B099a776A3](https://rinkeby.etherscan.io/address/0xeC6CcE025e538D12E52D8C90181849B099a776A3) |

## References

- [Chainlink Docs](https://docs.chain.link)
- [Chainlink Hardhat Box](https://github.com/smartcontractkit/hardhat-starter-kit)
- [Scaffold ETH](https://github.com/scaffold-eth/scaffold-eth/blob/nextjs-typescript)
