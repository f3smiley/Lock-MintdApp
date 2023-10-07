import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';

const Balance = ({ provider, account }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (provider && account) {
      const contract = new ethers.Contract(SyntheticToken.networks[137].address, SyntheticToken.abi, provider);
      const getBalance = async () => {
        const balance = await contract.balanceOf(account);
        setBalance(ethers.utils.formatEther(balance));
      };
      getBalance();
    }
  }, [provider, account]);

  return (
    <div id="token-balance">
      <h2>Your Balance</h2>
      <p>{balance} Synthetic Tokens</p>
    </div>
  );
};

export default Balance;