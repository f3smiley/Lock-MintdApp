import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../contracts/SyntheticToken.json';

const TotalSupply = ({ provider }) => {
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(SyntheticToken.address, SyntheticToken.abi, provider);
      getTotalSupply(contract);
    }
  }, [provider]);

  const getTotalSupply = async (contract) => {
    const supply = await contract.totalSupply();
    setTotalSupply(ethers.utils.formatEther(supply));
  };

  return (
    <div id="total-supply">
      <h2>Total Supply</h2>
      <p>{totalSupply}</p>
    </div>
  );
};

export default TotalSupply;