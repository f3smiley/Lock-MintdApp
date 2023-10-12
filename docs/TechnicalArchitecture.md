# Technical Architecture

This document outlines the technical architecture of our synthetic token minting dApp. The dApp allows users to lock assets on one blockchain (Defi Oracle Meta Mainnet) and mint synthetic tokens representing those assets on another blockchain (Polygon). The value of the locked assets is reflected in the synthetic tokens through an oracle integration.

## Smart Contracts

The dApp consists of two smart contracts deployed on different blockchains:

### TokenLocker Contract

The TokenLocker contract is deployed on the Defi Oracle Meta Mainnet (chain 138). This contract allows users to lock their ETH by calling the `lockETH()` function. The contract is owned by a single entity who has the ability to withdraw the locked funds. When users lock their tokens, the contract emits a `TokensLocked` event.

The source code for this contract can be found in `src/contracts/TokenLocker.sol`.

### SyntheticToken Contract

The SyntheticToken contract is an ERC20 compliant token contract deployed on the Polygon network (chain 137). This contract mints new tokens when the `mintTokens()` function is called and burns tokens when the `burn()` function is called. 

The contract integrates a Chainlink oracle to get the latest ETH/USD price from chain 138 and updates the total token supply value based on the locked assets on chain 138. It then reflects this value on chain 137.

The source code for this contract can be found in `src/contracts/SyntheticToken.sol`.

## Chainlink Oracle

The Chainlink oracle, along with other nodes like Bisu on chain 138 and the node for Polygon on chain 137, provides the bridge between the two contracts. It supplies ETH/USD price data from chain 138 to the Polygon network on chain 137. This allows the SyntheticToken contract to reflect the value of the locked assets in the minted synthetic tokens on chain 137.

## Frontend Interface

Users interact with the dApp through a frontend interface built with React. The interface uses Web3.js to connect to the user's wallet and call contract functions. 

The interface allows users to:

- View their token balance
- View the token value
- Lock ETH on the Defi Oracle Meta Mainnet
- Mint synthetic tokens on the Polygon network
- Burn synthetic tokens to unlock their ETH

The source code for the frontend interface can be found in the `src/components` directory.

## JavaScript Functions

The minting and burning process is handled by JavaScript functions which call the respective contract functions. These functions are:

- `lockETH()`: Interacts with the TokenLocker contract to lock tokens and emit an event on chain 138.
- `mintTokens()`: Listens for the lock event on chain 138 and mints synthetic tokens on chain 137.
- `updateValue()`: Gets the latest price from the Chainlink oracle and other nodes on chain 138, and updates the synthetic token value on chain 137.

The source code for these functions can be found in the `src/js` directory.
