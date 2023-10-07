import React, { useState } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';

const MintTokens = () => {
  const [value, setValue] = useState('');

  const mintTokens = async () => {
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
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter amount to mint"
      />
      <button onClick={mintTokens}>Mint Tokens</button>
    </div>
  );
};

export default MintTokens;