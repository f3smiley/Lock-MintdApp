```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SyntheticToken is ERC20 {
    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) ERC20("SyntheticToken", "SYN") {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        _burn(from, amount);
    }

    function getLatestPrice() public view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }

    function updateValue() public {
        int price = getLatestPrice();
        _totalSupply = _totalSupply * uint256(price);
    }
}
```