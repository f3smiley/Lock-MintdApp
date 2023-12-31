# Deployment

This document provides a step-by-step guide on how to deploy the synthetic token minting dApp.

## Prerequisites

Ensure you have the following installed:

- Node.js
- Truffle
- Ganache (for local testing)

## Deploying the Contracts and Setting Up Chainlink Oracle

1. Compile the contracts:

```bash
truffle compile
```

2. Deploy the `TokenLocker` contract to Defi Oracle Meta Mainnet (chain 138) and link it with Chainlink Oracle and Bisu node:
```bash
truffle migrate --network defiOracleMetaMainnet
```
3. Deploy the `SyntheticToken` contract to Polygon (chain 137) and link it with Chainlink Oracle and Polygon node:
```bash
truffle migrate --network polygon

```bash
truffle migrate --network polygon
```

## Deploying the Chainlink Oracle

1. Fund the Chainlink oracle contract with LINK tokens.

## Setting Up Chainlink Oracle
1. Fund the Chainlink oracle contract with LINK tokens.
2. Deploy the Chainlink oracle contract on Polygon and link it with `SyntheticToken` contract and Polygon node:
```bash
truffle migrate --network polygon
```
3. Connect the oracle to the `SyntheticToken` contract by calling the `setOracle` function with the oracle's address. Also, ensure to carry over the price of the locked ETH from chain 138 to chain 137.

## Deploying the Frontend

1. Build the React frontend:
## Deploying the Frontend
1. Build the React frontend with Tailwind CSS:
```bash
npm run build
```
2. Deploy the build folder to a static file hosting service like Netlify or Vercel. Ensure the frontend is able to show the value of locked ETH on chain 137 Polygon.

## Configuring the Contracts

## Configuring the Contracts and Chainlink Oracle
1. Update the `src/js/lockETH.js`, `src/js/mintTokens.js`, and `src/js/updateValue.js` files with the addresses of the deployed contracts and Chainlink Oracle.
2. Update the `src/components/Balance.js`, `src/components/TotalSupply.js`, `src/components/TokenValue.js`, `src/components/LockTokens.js`, `src/components/MintTokens.js`, and `src/components/BurnTokens.js` files with the addresses of the deployed contracts and Chainlink Oracle.

## Testing

Run the tests to ensure everything is working as expected:

```bash
truffle test
```

## Mainnet Deployment

Before deploying to mainnet, ensure you have thoroughly tested the dApp on testnets. Replace the network in the truffle migrate command with `mainnet` to deploy to mainnet.

Remember to update the contract addresses in the JavaScript files and React components with the mainnet contract addresses.
