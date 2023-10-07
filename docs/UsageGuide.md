# Usage Guide

This guide will walk you through the steps to interact with the synthetic token minting dApp.

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js
- npm
- Metamask or any other Web3 compatible wallet

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/synthetic-token-minting-dapp.git
```

2. Navigate to the project directory:

```bash
cd synthetic-token-minting-dapp
```

3. Install the dependencies:

```bash
npm install
```

## Configuration

1. Open the `.env` file in the root directory and add the following:

```bash
REACT_APP_TOKEN_LOCKER_ADDRESS=<TokenLocker Contract Address>
REACT_APP_SYNTHETIC_TOKEN_ADDRESS=<SyntheticToken Contract Address>
REACT_APP_CHAINLINK_ORACLE_ADDRESS=<Chainlink Oracle Address>
```

Replace `<TokenLocker Contract Address>`, `<SyntheticToken Contract Address>`, and `<Chainlink Oracle Address>` with the actual contract addresses.

2. Save and close the `.env` file.

## Running the dApp

1. Start the dApp:

```bash
npm start
```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Connect your wallet by clicking on the "Connect Wallet" button.

## Interacting with the dApp

1. To lock ETH on Defi Oracle Meta Mainnet, enter the amount of ETH and click on the "Lock Tokens" button.

2. To mint synthetic tokens on Polygon, click on the "Mint Tokens" button.

3. To burn synthetic tokens and unlock ETH, enter the amount of synthetic tokens and click on the "Burn Tokens" button.

4. You can view your token balance, total token supply, and token value on the dashboard.

## Testing

To run the tests:

```bash
npm test
```

## Troubleshooting

If you encounter any issues, please check the console for any error messages. Make sure your wallet is connected and you have sufficient ETH for transactions.

## Conclusion

That's it! You are now able to interact with the synthetic token minting dApp. Enjoy minting!