import React, { useState } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';

const BurnTokens = ({ provider, account }) => {
  const [amount, setAmount] = useState('');

  const burnTokens = async () => {
    if (!amount || !provider || !account) return;

    const contract = new ethers.Contract(SyntheticToken.networks[137].address, SyntheticToken.abi, provider.getSigner());
    const weiAmount = ethers.utils.parseEther(amount);
    await contract.burn(weiAmount);
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
    </div>
  );
};

export default BurnTokens;