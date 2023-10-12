import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SyntheticToken from '../abis/SyntheticToken.json';
import SyntheticTokenBisu from '../abis/SyntheticTokenBisu.json';

const TokenValue = () => {
  const [tokenValuePolygon, setTokenValuePolygon] = useState(0);
  const [tokenValueBisu, setTokenValueBisu] = useState(0);

  useEffect(() => {
    const fetchTokenValue = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractPolygon = new ethers.Contract(SyntheticToken.networks[137].address, SyntheticToken.abi, provider);
      const valuePolygon = await contractPolygon.tokenValue();
      setTokenValuePolygon(ethers.utils.formatEther(valuePolygon));

      const providerBisu = new ethers.providers.Web3Provider(window.ethereum, 'bisu');
      const contractBisu = new ethers.Contract(SyntheticTokenBisu.networks[138].address, SyntheticTokenBisu.abi, providerBisu);
      const valueBisu = await contractBisu.tokenValue();
      setTokenValueBisu(ethers.utils.formatEther(valueBisu));
    };

    fetchTokenValue();
  }, []);

  return (
    <div id="token-value">
      <h2>Synthetic Token Value</h2>
      <p>Polygon: {tokenValuePolygon} ETH</p>
      <p>Bisu: {tokenValueBisu} ETH</p>
    </div>
  );
};

export default TokenValue;
