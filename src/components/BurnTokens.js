import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';
import ChainlinkPriceFeed from '../abis/ChainlinkPriceFeed.json';
import { getChainlinkPrice } from '../js/chainlink.js';

const BurnTokens = ({ provider, account }) => {
  const [amount, setAmount] = useState('');
  const [ethPrice, setEthPrice] = useState('');
  const [polygonPrice, setPolygonPrice] = useState('');

  const burnTokens = async () => {
    if (!amount || !provider || !account) return;

    const contract = new ethers.Contract(SyntheticToken.networks[137].address, SyntheticToken.abi, provider.getSigner());
    const weiAmount = ethers.utils.parseEther(amount);
    await contract.burn(weiAmount);

    const ethPriceFeed = new ethers.Contract(ChainlinkPriceFeed.networks[138].address, ChainlinkPriceFeed.abi, provider.getSigner());
    const polygonPriceFeed = new ethers.Contract(ChainlinkPriceFeed.networks[137].address, ChainlinkPriceFeed.abi, provider.getSigner());

    const ethPrice = await getChainlinkPrice(ethPriceFeed);
    const polygonPrice = await getChainlinkPrice(polygonPriceFeed);

    setEthPrice(ethPrice);
    setPolygonPrice(polygonPrice);
  };

  return (
    <div id="burn-tokens">
      <h2>Burn Synthetic Tokens</h2>
      <input
        type="text"
        placeholder="Amount to burn"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={burnTokens}>Burn</button>
      <div>
        <h3>ETH Price: {ethPrice}</h3>
        <h3>Polygon Price: {polygonPrice}</h3>
      </div>
    </div>
  );
};

export default BurnTokens;
