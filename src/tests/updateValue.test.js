const assert = require('assert');
const { ethers } = require('hardhat');

describe('updateValue', function () {
  let SyntheticToken, syntheticToken, updateValue;
  const initialPrice = ethers.utils.parseEther('1000'); // Initial price is 1000 USD

  before(async function () {
    SyntheticToken = await ethers.getContractFactory('SyntheticToken');
    syntheticToken = await SyntheticToken.deploy(initialPrice);
    await syntheticToken.deployed();

    updateValue = require('../js/updateValue');
  });

  it('should update the value of synthetic tokens', async function () {
    // Simulate a price update from Chainlink oracle
    const newPrice = ethers.utils.parseEther('2000'); // New price is 2000 USD
    await syntheticToken.updatePrice(newPrice);

    // Call updateValue function
    await updateValue();

    // Check that the value of synthetic tokens has been updated
    const value = await syntheticToken.value();
    assert.equal(value.toString(), newPrice.toString(), 'Value of synthetic tokens was not updated correctly');
  });
});