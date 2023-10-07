const Web3 = require('web3');
const { abi: tokenLockerAbi, address: tokenLockerAddress } = require('../contracts/TokenLocker.json');

const web3 = new Web3('https://rpc-mainnet.maticvigil.com');

const tokenLockerContract = new web3.eth.Contract(tokenLockerAbi, tokenLockerAddress);

async function lockETH(amount, fromAddress) {
  const weiAmount = web3.utils.toWei(amount, 'ether');

  const gasPrice = await web3.eth.getGasPrice();
  const gasEstimate = await tokenLockerContract.methods.lockTokens(weiAmount).estimateGas({ from: fromAddress });

  const receipt = await tokenLockerContract.methods.lockTokens(weiAmount).send({
    from: fromAddress,
    gasPrice,
    gas: gasEstimate,
  });

  console.log(`Tokens locked: ${receipt.events.TokensLocked.returnValues.amount}`);
}

module.exports = lockETH;