const assert = require('assert');
const { ethers, network } = require('hardhat');
const { expect } = require('chai');
const { getChainlinkPrice } = require('../js/updateValue');

describe('updateValue', function () {
  let SyntheticToken, syntheticToken, updateValue, chainlinkPrice;
  const initialPrice = ethers.utils.parseEther('1000'); // Initial price is 1000 USD

  before(async function () {
    SyntheticToken = await ethers.getContractFactory('SyntheticToken');
    syntheticToken = await SyntheticToken.deploy(initialPrice);
    await syntheticToken.deployed();

    updateValue = require('../js/updateValue');
  });

  it('should update the value of synthetic tokens', async function () {
    // Simulate a price update from Chainlink oracle
    chainlinkPrice = await getChainlinkPrice(network.config.chainId);
    await syntheticToken.updatePrice(chainlinkPrice);

    // Call updateValue function
    await updateValue();

    // Check that the value of synthetic tokens has been updated
    const value = await syntheticToken.value();
    assert.equal(value.toString(), chainlinkPrice.toString(), 'Value of synthetic tokens was not updated correctly');
  });

  it('should handle errors correctly', async function () {
    // Simulate a price update from Chainlink oracle with invalid chainId
    try {
      chainlinkPrice = await getChainlinkPrice(9999); // Invalid chainId
      await syntheticToken.updatePrice(chainlinkPrice);
      await updateValue();
      assert.fail('Expected error was not thrown');
    } catch (error) {
      expect(error.message).to.include('Chainlink price feed not found for the given chainId');
    }
  });
});
