// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";
import "@chainlink/contracts/src/v0.8/Denominations.sol";

contract FeedRegistryConsumer {
  FeedRegistryInterface internal registry;

  /**
   * Network: Ethereum Mainnet
   * Feed Registry: 0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf
   */
  constructor(address _registry) {
    registry = FeedRegistryInterface(_registry);
  }

  /**
   * Returns the ETH / USD price
   */
  function getEthUsdPrice() public view returns (int256) {
    (, int256 price, , , ) = registry.latestRoundData(Denominations.ETH, Denominations.USD);
    return price;
  }

  /**
   * Returns the latest price
   */
  function getPrice(address base, address quote) public view returns (int256) {
    (, int256 price, , , ) = registry.latestRoundData(base, quote);
    return price;
  }
}
