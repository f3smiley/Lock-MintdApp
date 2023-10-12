// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract SyntheticToken is ERC20, ReentrancyGuard {
    using SafeMath for uint256;
    AggregatorV3Interface internal priceFeed;    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) ERC20("SyntheticToken", "SYN") {
priceFeed = AggregatorV3Interface(_priceFeed);fix

}

    function mint(address to, uint256 amount) public nonReentrant {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public nonReentrant {
        _burn(from, amount);
    }

    function getLatestPrice() public view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        require(price > 0, "Price is not valid");
        return price;
    }

    function updateValue() external nonReentrant {
        int price = getLatestPrice();
        require(price > 0, "Price is not valid");
        _mint(address(this), totalSupply().mul(uint256(price)));
    }

}