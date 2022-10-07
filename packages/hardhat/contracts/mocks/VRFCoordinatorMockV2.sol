// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract VRFCoordinatorMockV2 {

  event RandomWordsRequested(
    bytes32 indexed keyHash,
    uint256 requestId,
    uint256 preSeed,
    uint64 indexed subId,
    uint16 minimumRequestConfirmations,
    uint32 callbackGasLimit,
    uint32 numWords,
    address indexed sender
  );

  function callBackWithRandomness(
    bytes32 requestId,
    uint256[] memory randomness,
    address consumerContract
  ) public {
    VRFConsumerBaseV2 v;
    bytes memory resp = abi.encodeWithSelector(v.rawFulfillRandomWords.selector, requestId, randomness);
    uint256 b = 206000;
    require(gasleft() >= b, "not enough gas for consumer");
    (bool success, ) = consumerContract.call(resp);
  }

  function requestRandomWords(
    bytes32 _keyHash,
    uint64 _subId,
    uint16 _minimumRequestConfirmations,
    uint32 _callbackGasLimit,
    uint32 _numWords
  ) external returns (uint256) {
    emit RandomWordsRequested(
      _keyHash,
      1,
      1,
      _subId,
      _minimumRequestConfirmations,
      _callbackGasLimit,
      _numWords,
      msg.sender
    );

    return 1;
  }
}
