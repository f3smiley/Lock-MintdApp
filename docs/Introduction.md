# Introduction

This document provides an introduction to our synthetic token minting decentralized application (dApp). The dApp is designed to allow users to lock assets on one blockchain (Defi Oracle Meta Mainnet, chain 138) and mint synthetic tokens representing those assets on another blockchain (Polygon, chain 137). The value of the locked assets is reflected in the synthetic tokens through an oracle integration.

## Overview

The dApp is built using Node.js, Solidity, Web3.js, and React. It consists of two smart contracts: `TokenLocker` and `SyntheticToken`, deployed on Defi Oracle Meta Mainnet and Polygon respectively. 

`TokenLocker` allows users to lock their Ethereum (ETH) and emits an event upon deposit. `SyntheticToken` is an ERC20 compliant token contract that mints new tokens when the `mint()` function is called and burns tokens when the `burn()` function is called. It also integrates a Chainlink oracle to get the latest ETH/USD price and updates the total token supply value based on locked assets.

## User Interaction

Users interact with the dApp through a frontend interface built with React. The interface uses Web3.js to connect to the user's wallet and call contract functions. Users can view their token balance, the token value, lock ETH on Defi Oracle Meta Mainnet, mint synthetic tokens on Polygon, and burn synthetic tokens to unlock ETH.

## Future Improvements

Future improvements to the dApp include adding more token types beyond ETH, using Chainlink VRF to implement random token distributions, and implementing staking rewards for locked assets.

## Deployment

The dApp can be deployed on testnets or mainnets for the respective chains. The `TokenLocker` contract is deployed to Defi Oracle Meta Mainnet, the `SyntheticToken` contract is deployed to Polygon, and a Chainlink oracle contract is funded and deployed on Polygon. The oracle is then connected to `SyntheticToken`, and the frontend is deployed and configured to interact with the contracts.

## Usage Guide

Please refer to the `UsageGuide.md` for detailed instructions on how to install dependencies and interact with the dApp.