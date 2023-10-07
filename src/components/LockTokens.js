import React, { useState } from 'react';
import { ethers } from 'ethers';
import TokenLocker from '../abis/TokenLocker.json';

const LockTokens = () => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');

  const lockTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TokenLocker.address, TokenLocker.abi, signer);

    try {
      const transaction = await contract.lockETH({ value: ethers.utils.parseEther(value) });
      setStatus(`Locking ${value} ETH...`);
      await transaction.wait();
      setStatus(`Successfully locked ${value} ETH!`);
    } catch (error) {
      console.error('An error occurred', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Lock Tokens</h2>
      <input
        type="text"
        placeholder="Amount of ETH to lock"
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={lockTokens}>Lock Tokens</button>
      <p>{status}</p>
    </div>
  );
};

export default LockTokens;