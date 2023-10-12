const assert = require('assert');
const Web3 = require('web3');
const { abi: tokenLockerAbi, bytecode: tokenLockerBytecode } = require('../contracts/TokenLocker.json');
const { abi: syntheticTokenAbi, bytecode: syntheticTokenBytecode } = require('../contracts/SyntheticToken.json');
const { ChainlinkClient, Requester, Validator } = require('@chainlink/external-adapter');

const web3 = new Web3('http://localhost:8545'); // Replace with your RPC URL
const { address: admin } = web3.eth.getAccounts()[0];

describe('TokenLocker and SyntheticToken', () => {
  let tokenLocker;

  beforeEach(async () => {
    tokenLocker = await new web3.eth.Contract(tokenLockerAbi)
      .deploy({ data: tokenLockerBytecode })
      .send({ from: admin, gas: '5000000' });
  });

  it('should deploy the contract and save the address', async () => {
    assert.ok(tokenLocker.options.address);
  });

  it('should lock tokens and mint synthetic tokens', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    await tokenLocker.methods.lockETH().send({ from: admin, value: amount });
    const balance = await web3.eth.getBalance(tokenLocker.options.address);
    assert.strictEqual(balance, amount);

    const syntheticToken = await new web3.eth.Contract(syntheticTokenAbi)
      .deploy({ data: syntheticTokenBytecode })
      .send({ from: admin, gas: '5000000' });
    await syntheticToken.methods.mint(admin, amount).send({ from: admin });
    const syntheticBalance = await syntheticToken.methods.balanceOf(admin).call();
    assert.strictEqual(syntheticBalance, amount);
  });

  it('should emit TokensLocked and SyntheticTokensMinted events', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    const receipt = await tokenLocker.methods.lockETH().send({ from: admin, value: amount });
    assert.strictEqual(receipt.events.TokensLocked.returnValues.amount, amount);

    const syntheticToken = await new web3.eth.Contract(syntheticTokenAbi)
      .deploy({ data: syntheticTokenBytecode })
      .send({ from: admin, gas: '5000000' });
    const mintReceipt = await syntheticToken.methods.mint(admin, amount).send({ from: admin });
    assert.strictEqual(mintReceipt.events.SyntheticTokensMinted.returnValues.amount, amount);
  });
  it('should interact with Chainlink oracle', async () => {
    const chainlinkClient = new ChainlinkClient(web3);
    const jobId = 'your-job-id'; // replace with your job id
    const payment = '1 LINK'; // replace with the payment amount
    const url = 'http://example.com'; // replace with the url of the data provider
    const path = 'result'; // replace with the path to the data in the provider's response
    const times = '100'; // replace with the times amount to multiply the result by

    const request = chainlinkClient.buildChainlinkRequest(jobId, admin, payment, url, path, times);
    const receipt = await chainlinkClient.sendChainlinkRequest(request, { from: admin });
    assert.ok(receipt.events.ChainlinkFulfilled);
  });

  it('should handle errors', async () => {
    try {
      await tokenLocker.methods.lockETH().send({ from: admin, value: '0' });
    } catch (error) {
      assert.ok(error);
    }
  });
});
