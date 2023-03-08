// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/vendor/Ownable.sol";

contract APIConsumer is ChainlinkClient, Ownable {
  uint256 public data;
  string public text;

  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

  /**
   * Network: Sepolia
   * Oracle: 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD
   * Job ID: ca98366cc7314957b8c012c72f05aeeb
   * Fee: 0.1 LINK
   */
  constructor(
    address _oracle,
    string memory _jobId,
    uint256 _fee,
    address _link
  ) public {
    if (_link == address(0)) {
      setPublicChainlinkToken();
    } else {
      setChainlinkToken(_link);
    }
    // oracle = 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD;
    // jobId = "ca98366cc7314957b8c012c72f05aeeb";
    // fee = 0.1 * 10 ** 18; // 0.1 LINK
    oracle = _oracle;
    jobId = stringToBytes32(_jobId);
    fee = _fee;
  }

  /**
   * Create a Chainlink request to retrieve API response, find the target
   * data, then multiply by timesAmount (to remove decimal places from data).
   */
  function requestData(
    string memory url,
    string memory path,
    int256 timesAmount
  ) public returns (bytes32 requestId) {
    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    // Set the URL to perform the GET request on
    request.add("get", url);

    // Set the path to find the desired data in the API response, where the response format is:
    // {"RAW":
    //   {"ETH":
    //    {"USD":
    //     {
    //      "VOLUME24HOUR": xxx.xxx,
    //     }
    //    }
    //   }
    //  }
    request.add("path", path);

    // Multiply the result by timesAmount to remove decimals
    request.addInt("times", timesAmount);

    // Sends the request
    return sendChainlinkRequestTo(oracle, request, fee);
  }

  /**
   * Receive the response in the form of uint256
   */
  function fulfill(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId) {
    data = _data;
  }

  /**
   * Withdraw LINK from this contract
   *
   */
  function withdrawLink() external onlyOwner {
    LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
    require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
  }

  function stringToBytes32(string memory source) public pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly {
      result := mload(add(source, 32))
    }
  }
}
