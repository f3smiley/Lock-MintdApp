const assert = require('assert');
const Web3 = require('web3');
const { abi: tokenLockerAbi, address: tokenLockerAddress } = require('../contracts/TokenLocker.json');
const { lockETH } = require('../js/lockETH.js');

describe('lockETH', function() {
  this.timeout(30000);

  let web3;
  let accounts;
  let tokenLocker;

  before(async function() {
    web3 = new Web3('http://localhost:8545'); // Replace with your local Ganache instance
    accounts = await web3.eth.getAccounts();
    tokenLocker = new web3.eth.Contract(tokenLockerAbi, tokenLockerAddress);
  });

  it('should lock ETH and emit TokensLocked event', async function() {
    const amountToLock = web3.utils.toWei('1', 'ether');
    const receipt = await lockETH(web3, accounts[0], amountToLock);

    assert.ok(receipt);
    assert.ok(receipt.events);
    assert.ok(receipt.events.TokensLocked);
    assert.equal(receipt.events.TokensLocked.returnValues.amount, amountToLock);

    const balance = await tokenLocker.methods.balanceOf(accounts[0]).call();
    assert.equal(balance, amountToLock);
  });
});