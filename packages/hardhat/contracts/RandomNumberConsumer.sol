// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract RandomNumberConsumer is VRFV2WrapperConsumerBase {
  uint256 public randomResult;

  uint32 internal callbackGasLimit;
  // The default is 3, but you can set this higher.
  uint16 internal requestConfirmations = 3;
  // For this example, retrieve 2 random values in one request.
  // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
  uint32 internal numWords = 1;

  event RequestedRandomness(uint256 requestId);
  event FulfilledRandomness(uint256 requestId);

  /**
   * Constructor inherits VRFConsumerBase
   *
   * Network: Sepolia
   * Chainlink VRF Wrapper address:     0xab18414CD93297B0d12ac29E63Ca20f515b3DB46
   * LINK token address:                0x779877A7B0D9E8603169DdbD7836e478b4624789
   */
  constructor(
    address _wrapperAddress,
    address _link,
    uint32 _callbackGasLimit
  )
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
