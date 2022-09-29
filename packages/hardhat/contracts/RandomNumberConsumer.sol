pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {
  bytes32 internal keyHash;
  uint256 internal fee;
  uint256 public randomResult;
  event RequestedRandomness(bytes32 requestId);
  event FulfilledRandomness(bytes32 requestId);

  /**
   * Constructor inherits VRFConsumerBase
   *
   * Network: Goerli
   * Chainlink VRF Coordinator address: 0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4
   * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
   * Key Hash: 0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a
   */
  constructor(
    address _vrfCoordinator,
    address _link,
    bytes32 _keyHash,
    uint256 _fee
  )
    public
    VRFConsumerBase(
      _vrfCoordinator, // VRF Coordinator
      _link // LINK Token
    )
  {
    keyHash = _keyHash;
    fee = _fee;
  }

  /**
   * Requests randomness
   */
  function getRandomNumber() public returns (bytes32 requestId) {
    requestId = requestRandomness(keyHash, fee);
    emit RequestedRandomness(requestId);
  }

  /**
   * Callback function used by VRF Coordinator
   */
  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    randomResult = randomness;
    emit FulfilledRandomness(requestId);
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
