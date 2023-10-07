const assert = require('assert');
const SyntheticToken = artifacts.require("SyntheticToken");

contract('SyntheticToken', (accounts) => {
  let syntheticToken;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    syntheticToken = await SyntheticToken.new({from: owner});
  });

  it('should mint tokens correctly', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    await syntheticToken.mint(user, amount, {from: owner});
    const balance = await syntheticToken.balanceOf(user);
    assert.equal(balance.toString(), amount);
  });

  it('should burn tokens correctly', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    await syntheticToken.mint(user, amount, {from: owner});
    await syntheticToken.burn(amount, {from: user});
    const balance = await syntheticToken.balanceOf(user);
    assert.equal(balance.toString(), '0');
  });

  it('should update token value correctly', async () => {
    const price = web3.utils.toWei('500', 'ether'); // Assume ETH/USD price is 500
    await syntheticToken.updateValue(price, {from: owner});
    const tokenValue = await syntheticToken.getValue();
    assert.equal(tokenValue.toString(), price);
  });
});