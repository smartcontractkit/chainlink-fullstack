// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract RandomNumberConsumer is VRFV2WrapperConsumerBase, ConfirmedOwner {
  uint32 internal callbackGasLimit;
  uint256 public randomResult;
  event RequestedRandomness(uint256 requestId);
  event FulfilledRandomness(uint256 requestId);

  // The default is 3, but you can set this higher.
  uint16 requestConfirmations = 3;

  // For this example, retrieve 2 random values in one request.
  // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
  uint32 numWords = 1;

  /**
   * Constructor inherits VRFConsumerBase
   *
   * Network: Goerli
   * Chainlink VRF Wrapper address:     0x708701a1DfF4f478de54383E49a627eD4852C816
   * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
   */
  constructor(
    address _wrapperAddress,
    address _link,
    uint32 _callbackGasLimit
  )
    ConfirmedOwner(msg.sender)
    VRFV2WrapperConsumerBase(
      _link, // LINK Token
      _wrapperAddress // VRF Wrapper
    )
  {
    callbackGasLimit = _callbackGasLimit;
  }

  /**
   * Requests randomness
   */
  function getRandomNumber() public returns (uint256 requestId) {
    requestId = requestRandomness(callbackGasLimit, requestConfirmations, numWords);
    emit RequestedRandomness(requestId);
  }

  /**
   * Callback function used by VRF Coordinator
   */
  function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
    randomResult = _randomWords[0];
    emit FulfilledRandomness(_requestId);
  }

  /**
   * Withdraw LINK from this contract
   *
   * DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
   * THIS IS PURELY FOR EXAMPLE PURPOSES.
   */
  function withdrawLink() external {
    require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
  }
}
