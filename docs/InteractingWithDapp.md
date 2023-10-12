# Interacting with the dApp

This document provides a guide on how to interact with the synthetic token minting dApp.

## Viewing Token Balance

To view your current token balance, navigate to the main page of the dApp. Your token balance will be displayed in the 'Token Balance' section.

## Viewing Token Value

The current value of the synthetic tokens is displayed in the 'Token Value' section. This value is updated in real-time using the Chainlink oracle to fetch the latest ETH/USD price. Additionally, the value of the locked ETH on chain 138 is carried over and displayed on chain 137 (Polygon).

## Locking ETH on Defi Oracle Meta Mainnet

To lock your ETH and mint synthetic tokens, follow these steps:

1. Navigate to the 'Lock Tokens' section.
2. Enter the amount of ETH you want to lock.
3. Click on the 'Lock' button.

The dApp will interact with the TokenLocker contract to lock your ETH and emit a 'TokensLocked' event.

## Minting Synthetic Tokens on Polygon and Binance Smart Chain

Once the 'TokensLocked' event is emitted, the dApp will automatically mint an equivalent amount of synthetic tokens on the Polygon network and Binance Smart Chain (BSC) on chain 138. The minting process is handled by the `mintTokens()` function.

## Burning Synthetic Tokens to Unlock ETH

If you want to unlock your ETH, you can burn your synthetic tokens. Follow these steps:

1. Navigate to the 'Burn Tokens' section.
2. Enter the amount of synthetic tokens you want to burn.
3. Click on the 'Burn' button.

The dApp will interact with the SyntheticToken contract to burn your tokens and unlock an equivalent amount of ETH on the Defi Oracle Meta Mainnet.

Remember, the value of the synthetic tokens is pegged to the value of the locked ETH. Therefore, the amount of ETH you can unlock by burning synthetic tokens will depend on the current ETH/USD price provided by the Chainlink oracle. The dApp is linked with Chainlink oracle and other nodes like Bisu on chain 138 and the node for Polygon on chain 137 to ensure accurate value transfer and display.
