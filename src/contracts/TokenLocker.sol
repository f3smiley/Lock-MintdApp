```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenLocker is ReentrancyGuard {
    address public owner;
    uint256 public lockedETH;
    event TokensLocked(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function lockTokens() external payable nonReentrant {
        require(msg.value > 0, "Must send ETH to lock");
        lockedETH += msg.value;
        emit TokensLocked(msg.sender, msg.value);
    }

    function withdrawETH(uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(amount <= lockedETH, "Not enough ETH locked");
        lockedETH -= amount;
        payable(owner).transfer(amount);
    }
}
```