import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';

const TokenValue = () => {
  const [tokenValue, setTokenValue] = useState(0);

  useEffect(() => {
    const fetchTokenValue = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(SyntheticToken.networks[137].address, SyntheticToken.abi, provider);
      const value = await contract.tokenValue();
      setTokenValue(ethers.utils.formatEther(value));
    };

    fetchTokenValue();
  }, []);

  return (
    <div id="token-value">
      <h2>Synthetic Token Value</h2>
      <p>{tokenValue} ETH</p>
    </div>
  );
};

export default TokenValue;