const Web3 = require('web3');
const { abi: syntheticTokenAbi } = require('../contracts/SyntheticToken.json');

const provider = new Web3.providers.HttpProvider('https://rpc-mainnet.matic.network');
const web3 = new Web3(provider);

const syntheticTokenAddress = '0x...'; // Replace with SyntheticToken contract address
const syntheticTokenContract = new web3.eth.Contract(syntheticTokenAbi, syntheticTokenAddress);

async function mintTokens(account, amount) {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await syntheticTokenContract.methods.mint(account, amount).estimateGas({ from: account });

    const result = await syntheticTokenContract.methods.mint(account, amount).send({
      from: account,
      gasPrice,
      gas: gasEstimate
    });

    console.log('Tokens minted:', result);
  } catch (error) {
    console.error('An error occurred while minting tokens:', error);
  }
}

module.exports = mintTokens;