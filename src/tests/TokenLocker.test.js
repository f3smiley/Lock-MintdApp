const assert = require('assert');
const Web3 = require('web3');
const { abi: tokenLockerAbi, bytecode: tokenLockerBytecode } = require('../contracts/TokenLocker.json');

const web3 = new Web3('http://localhost:8545'); // Replace with your RPC URL
const { address: admin } = web3.eth.getAccounts()[0];

describe('TokenLocker', () => {
  let tokenLocker;

  beforeEach(async () => {
    tokenLocker = await new web3.eth.Contract(tokenLockerAbi)
      .deploy({ data: tokenLockerBytecode })
      .send({ from: admin, gas: '5000000' });
  });

  it('should deploy the contract and save the address', async () => {
    assert.ok(tokenLocker.options.address);
  });

  it('should lock tokens', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    await tokenLocker.methods.lockETH().send({ from: admin, value: amount });
    const balance = await web3.eth.getBalance(tokenLocker.options.address);
    assert.strictEqual(balance, amount);
  });

  it('should emit TokensLocked event', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    const receipt = await tokenLocker.methods.lockETH().send({ from: admin, value: amount });
    assert.strictEqual(receipt.events.TokensLocked.returnValues.amount, amount);
  });
});