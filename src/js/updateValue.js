const Web3 = require('web3');
const { ChainlinkPriceOracleABI, ChainlinkPriceOracleAddress } = require('../contracts/ChainlinkPriceOracle');
const { SyntheticTokenABI, SyntheticTokenAddress } = require('../contracts/SyntheticToken');

const web3_137 = new Web3('https://rpc-mainnet.maticvigil.com/');
const web3_138 = new Web3('https://rpc-mainnet.maticvigil.com/');

const ChainlinkPriceOracle = new web3_137.eth.Contract(ChainlinkPriceOracleABI, ChainlinkPriceOracleAddress);
const SyntheticToken_137 = new web3_137.eth.Contract(SyntheticTokenABI, SyntheticTokenAddress);
const SyntheticToken_138 = new web3_138.eth.Contract(SyntheticTokenABI, SyntheticTokenAddress);

async function updateValue() {
  try {
    const price = await ChainlinkPriceOracle.methods.latestRoundData().call();
    const tokenValue = document.getElementById('token-value');
    tokenValue.innerText = `1 SyntheticToken = ${price} USD`;
  } catch (error) {
    console.error(`Failed to update token value: ${error}`);
  }
}

async function updateTokenValueOnChains() {
  try {
    const price_137 = await SyntheticToken_137.methods.latestRoundData().call();
    const price_138 = await SyntheticToken_138.methods.latestRoundData().call();
    const tokenValue = document.getElementById('token-value');
    tokenValue.innerText = `1 SyntheticToken = ${price_137} USD on Chain 137 and ${price_138} USD on Chain 138`;
  } catch (error) {
    console.error(`Failed to update token value on chains: ${error}`);
  }
}

module.exports = { updateValue, updateTokenValueOnChains };
