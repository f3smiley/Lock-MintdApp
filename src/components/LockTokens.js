import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenLocker from '../abis/TokenLocker.json';
import { getChainlinkPrice } from '../js/updateValue';
import { getLockedETH } from '../js/lockETH';

const LockTokens = () => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [lockedETH, setLockedETH] = useState('');
  const [chainlinkPrice, setChainlinkPrice] = useState('');

const lockTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TokenLocker.address, TokenLocker.abi, signer);
    const chainlinkPrice = await getChainlinkPrice();
    const lockedETH = await getLockedETH();
    setChainlinkPrice(chainlinkPrice);
    setLockedETH(lockedETH);

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
      <p>Locked ETH on Chain 138: {lockedETH}</p>
      <p>Chainlink Price on Chain 137: {chainlinkPrice}</p>
    </div>
  );
};

export default LockTokens;
