import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';
import ChainlinkPriceFeed from '../abis/ChainlinkPriceFeed.json';
import { getLockedETHValue } from '../js/updateValue';

const MintTokens = () => {
  const [value, setValue] = useState('');
  const [lockedETHValue, setLockedETHValue] = useState('');

  const mintTokens = async () => {
    const lockedETHValue = await getLockedETHValue();
    setLockedETHValue(lockedETHValue);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const syntheticTokenContract = new ethers.Contract(SyntheticToken.networks[137].address, SyntheticToken.abi, signer);
      const tx = await syntheticTokenContract.mint(ethers.utils.parseEther(value));
      await tx.wait();
      alert('Tokens minted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error minting tokens. See console for details.');
    }
  };

  return (
    <div>
      <h2>Mint Synthetic Tokens</h2>
      <p>Locked ETH Value on Chain 138: {lockedETHValue}</p>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter amount to mint"
      />
      <button onClick={mintTokens}>Mint Tokens</button>
      <p>Value on Chain 137 (Polygon): {value}</p>
    </div>
  );
};

export default MintTokens;
