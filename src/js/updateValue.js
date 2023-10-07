const Web3 = require('web3');
const { ChainlinkPriceOracleABI, ChainlinkPriceOracleAddress } = require('../contracts/ChainlinkPriceOracle');

const web3 = new Web3('https://rpc-mainnet.maticvigil.com/');

const ChainlinkPriceOracle = new web3.eth.Contract(ChainlinkPriceOracleABI, ChainlinkPriceOracleAddress);

async function updateValue() {
  try {
    const price = await ChainlinkPriceOracle.methods.latestRoundData().call();
    const tokenValue = document.getElementById('token-value');
    tokenValue.innerText = `1 SyntheticToken = ${price} USD`;
  } catch (error) {
    console.error(`Failed to update token value: ${error}`);
  }
}

module.exports = updateValue;